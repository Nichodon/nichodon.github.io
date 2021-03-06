import xml.etree.ElementTree
import itertools
import random
import string
import codecs
from xml.sax.saxutils import escape

nilRef = "javascript:void(0);"

tabSystemFile = "js/tab-system.js"
tippyFile = "js/tippy.min.js"


def generateTippyTooltipScript(result, attribs, thash):
    jsObject = ";tippy('#%s', {" % thash

    for key in attribs:
        if key in ['title', 'href', 'id', 'class']:
            continue

        if attribs[key].isdigit() or attribs[key][0] == '[':
            jsObject += "%s: %s, " % (key, attribs[key])
        else:
            jsObject += "%s: '%s', " % (key, attribs[key])

    jsObject += '});'

    return jsObject

def generateHLJSScript(attribs, thash):
    return """;hljs.highlightBlock(document.getElementById("%s"));""" % thash

def includeJSScriptGen(script_path):
    return """</script>\n<script src="%s"></script>\n<script>""" % script_path

def addTabModule(article):
    article.addHeaderScript(includeJSScriptGen(tabSystemFile))

def escapeJSScriptGen(contf):
    return """</script>\n%s\n<script>""" % contf

def randomObjHash(length = 10):
    return 'f_' + ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(length))

tagRemove = randomObjHash() + randomObjHash()
newlineInsert = randomObjHash() + randomObjHash()
tabInsert = randomObjHash() + randomObjHash()
spaceInsert = randomObjHash() + randomObjHash()

def addTippyModule(article):
    article.addHeaderScript(includeJSScriptGen(tippyFile))

def addHighlighterModule(article):
    article.addHeaderScript(escapeJSScriptGen("""<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>"""))

def parseInlineCode(inline_code, article):
    if "hljs" not in article.opts:
        addHighlighterModule(article)
        article.opts["hljs"] = True

    attrib = inline_code.attrib

    inline_code.tag = "span"
    attrib["id"] = randomObjHash()

    article.addFooterScript(generateHLJSScript(attrib, attrib["id"]))

    if "lang" in attrib:
        if "class" not in attrib:
            attrib["class"] = ""
        if attrib["lang"] == "none":
            attrib["class"] += " nohighlight"
        else:
            attrib["class"] += " " + attrib["lang"]
        attrib.pop("lang", None)

    if "class" in attrib:
        attrib["class"] += " inline-code"
    else:
        attrib["class"] = "cpp inline-code"

def parseReference(ref, article):
    attrib = ref.attrib
    if "to" in attrib:
        ref.tag = "a"
        ref.attrib["href"] = article.getHashByTitle(ref.attrib["to"])
        ref.attrib.pop("to", None)
    elif "sect" in attrib:
        ref.tag = "a"
        ref.attrib["href"] = hashLoc(attrib.sect)
        ref.attrib.pop("sect", None)

def parseLink(ref, article):
    attrib = ref.attrib
    ref.tag = "a"

    if "href" in attrib:
        ref.tag = "a"
        return

    if "to" in attrib:
        ref.attrib["href"] = ref.attrib["to"]
        ref.attrib.pop("to", None)

    if "noleave" not in attrib:
        attrib["target"] = "_blank"

def parseTooltip(ref, article):
    if "tippy" not in article.opts:
        addTippyModule(article)
        article.opts["tippy"] = True

    attrib = ref.attrib
    ref.tag = "a"

    if "tip" in attrib:
        attrib["title"] = attrib["tip"]
        attrib.pop("tip", None)
    if "title" not in attrib:
        raise AttributeError("No tip or title attribute for tooltip.")

    if "arrow" not in attrib:
        attrib["arrow"] = "true"
    if "delay" not in attrib:
        attrib["delay"] = "200"
    if "maxwidth" not in attrib:
        attrib["maxwidth"] = "180px"
    if "href" not in attrib:
        attrib["href"] = nilRef
    if "placement" not in attrib:
        attrib["placement"] = "bottom"

    thash = randomObjHash()
    article.addFooterScript(generateTippyTooltipScript(attrib["title"], attrib, thash))

    attrib["id"] = thash

def parseText(ref, article):
    ref.tag = "div"
    ref.attrib["class"] = "code-cf"

    return XMLtostr(ref)

def parseTabSystem(ref, article):
    if "tabsystem" not in article.opts:
        addTabModule(article)
        article.opts["tabsystem"] = True

    if "max-height" in ref.attrib:
        if "style" not in ref.attrib:
            ref.attrib["style"] = ""
        ref.attrib["style"] += ";max-height: %s%s;" % (height, "" if height[-1] == 'x' else "px")
    else:
        if "style" not in ref.attrib:
            ref.attrib["style"] = ""
        ref.attrib["style"] += ";max-height: 750px;";

    tabs = []
    index = 0

    system_hash = randomObjHash()

    for tab in ref.iterfind("tab"):
        index += 1

        tab.tag = "div"
        tab.attrib["class"] = "tab-content"
        tab.attrib["id"] = randomObjHash()

        tabtitle = None
        if "title" in tab.attrib:
            tabtitle = tab.attrib["title"]

        if tabtitle is None:
            tabtitle = str(index)

        tab.attrib.pop("title", None)

        tabs.append([tab.attrib["id"], tabtitle.text if type(tabtitle) == 'Element' else tabtitle])
        for i in parseContents(tab, article):
            pass

    button_div = xml.etree.ElementTree.Element("div", {"class" : "tab"})

    for tab in tabs:
        button = xml.etree.ElementTree.SubElement(button_div, "button", {"class" : "tablinks", "onclick" : "openTabID(event, '%s', '%s')" % (tab[0], system_hash)})
        button.text = tab[1]

    ref.tag = "div"
    ref.attrib["class"] = "tab-system"
    ref.attrib["id"] = system_hash

    if "default" not in ref.attrib:
        ref.attrib["default"] = "0"

    default_index = ref.attrib["default"]

    article.addFooterScript(""";document.getElementById("%s").getElementsByClassName("tab-content")[%s].style.display="block";document.getElementById("%s").getElementsByClassName("tablinks")[%s].className+=" active-f";""" % (system_hash, default_index, system_hash, default_index))
    ref.insert(0, button_div)
    ref.attrib.pop("default", None)

    return XMLtostr(ref)

def parseInlineHTML(ref, article):
    ref.tag = tagRemove
    del ref.attrib
    ref.attrib = {}

    return XMLtostr(ref)


def parseVocab(ref, article):
    attrib = ref.attrib

    if "alias" in attrib:
        attrib["title"] = article.findVocab(attrib["alias"])
    if "title" not in attrib:
        attrib["title"] = article.findVocab(ref.text)

    parseTooltip(ref, article)
    return ref

def parseParagraph(node, article):
    for inline_code in itertools.chain(node.iterfind('inline-code'), node.iterfind('inline'), node.iterfind('inl')):
        parseInlineCode(inline_code, article)

    for ref in itertools.chain(node.iterfind('reference'), node.iterfind('ref')):
        parseReference(ref, article)

    for ref in node.iterfind('link'):
        parseLink(ref, article)

    for ref in node.iterfind('tooltip'):
        parseTooltip(ref, article)

    for ref in node.iterfind('vocab'):
        parseVocab(ref, article)

    for ref in node.iterfind('list'):
        parseList(ref, article)

    for ref in itertools.chain(node.iterfind('text'), node.iterfind('txt')):
        parseText(ref, article)

    return XMLtostr(node)

def parseCode(node, article):
    if "hljs" not in article.opts:
        addHighlighterModule(article)
        article.opts["hljs"] = True

    attrib = node.attrib

    node.tag = "div"
    attrib["id"] = randomObjHash()
    attrib["class"] = "code-cf"

    if "lang" in attrib:
        if attrib["lang"] == "none":
            attrib["class"] += " nohighlight"
        else:
            attrib["class"] += " " + attrib["lang"]
    else:
        attrib["class"] += " cpp"

    article.addFooterScript(generateHLJSScript(attrib, attrib["id"]))
    return XMLtostr(node)

def parseList(node, article):
    attrib = node.attrib
    if "enumeration" in attrib:
        attrib["enum"] = attrib["enumeration"]

    list_type = 0
    ordered = False
    ftype = None
    if attrib["enum"] == "number":
        ordered = True
        ftype = '1'
    elif attrib["enum"] == "upper" or attrib["enum"] == "uppercase":
        ordered = True
        ftype = 'A'
    elif attrib["enum"] == "lower" or attrib["enum"] == "lowercase":
        ordered = True
        ftype = 'a'
    elif attrib["enum"] == "roman":
        ordered = True
        ftype = 'i'

    if ordered:
        attrib["type"] = ftype
        node.tag = "ol"
    else:
        node.tag = "ul"

    attrib.pop("enum", None)
    attrib.pop("enumerate", None)

    for refc in node.getchildren():
        parseParagraph(refc, article)
        refc.tag = "li"

    return XMLtostr(node)

def parseImage(node, article):
    attrib = node.attrib

    if "file" in attrib:
        attrib["src"] = attrib["file"]
        attrib.pop("file", None)
    if "loc" in attrib:
        attrib["src"] = attrib["loc"]
        attrib.pop("loc", None)
    if "src" not in attrib:
        raise AttributeError("src attribute not in image.")
    if "max-width" in attrib:
        if "style" not in attrib:
            attrib["style"] = ""
        attrib["style"] += ";max-width:%s;" % attrib["max-width"]
        attrib.pop("max-width", None)
    if "min-width" in attrib:
        if "style" not in attrib:
            attrib["style"] = ""
        attrib["style"] += ";min-width:%s;" % attrib["min-width"]
        attrib.pop("min-width", None)

    return XMLtostr(node)

def parseFigure(node, article):
    for capt in node.iterfind("figcaption"):
        parseParagraph(capt, article)

    for img in node.iterfind("image"):
        parseImage(img, article)

    return XMLtostr(node)

def parseTable(node, article):
    for row in node.iterfind('tr'):
        for cell in node.iterfind('th'):
            parseParagraph(cell, article)

    return XMLtostr(node)

node_type_dict = {
"p": parseParagraph,
"list": parseList,
"code": parseCode,
"tab-system": parseTabSystem,
"inline-html": parseInlineHTML,
"html": parseInlineHTML,
"figure": parseFigure,
"text": parseText,
"txt": parseText,
"table": parseTable
}

def XMLtostr(node):
    return xml.etree.ElementTree.tostring(node)

def parseContentSN(node, article):
    try:
        return node_type_dict[node.tag.lower()](node, article)
    except KeyError:
        print "Unknown tag " + node.tag + "."
        return XMLtostr(node)
    except Exception, e:
        print "Error parsing tag " + node.tag + ":\n%s" % e

def parseContents(node, article):
    for subnode in node.getchildren():
        yield parseContentSN(subnode, article)

def escapeTabify(strf):
    p = ""
    for line in iter(strf.splitlines()):
        if not line or line.isspace():
            p += '\n'
            continue

        print line

        findex = -1
        for i, c in enumerate(line):
            if not c.isspace():
                findex = i
                break

        if (findex == -1):
            continue

        line = tabInsert * (findex) + line[findex:]
        p += line + '\n'
    return p


def parseInclude(node, article):
    attrib = node.attrib

    if "file" in attrib:
        attrib["loc"] = attrib["file"]
    if "loc" not in attrib:
        raise AttributeError("No file location specified for include.")
    if "notabify" in attrib:
        node.text = codecs.open(attrib["loc"], 'r', 'utf-8').read().replace('\n', newlineInsert).replace(' ', spaceInsert)
    else:
        node.text = escapeTabify(codecs.open(attrib["loc"], 'r', 'utf-8').read()).replace('\n', newlineInsert)
    node.tag = tagRemove
    del node.attrib
    node.attrib = {}

def parseIncludes(node, article):
    for include_node in node.iter("include"):
        parseInclude(include_node, article)

def parse(node, article):
    parseIncludes(node, article)
    return '<div class="content">\n%s\n</div>' % ('\n'.join(parseContents(node, article)).replace("<%s>" % tagRemove, '\n').replace("</%s>" % tagRemove, '\n').replace(newlineInsert, ' <br />\n').replace(tabInsert, '&nbsp;&nbsp;').replace(spaceInsert, '&nbsp;'))
