(() => {
  var Ki = Object.create;
  var su = Object.defineProperty, Wi = Object.defineProperties, Ji = Object.getOwnPropertyDescriptor, qi = Object.getOwnPropertyDescriptors, Vi = Object.getOwnPropertyNames, La = Object.getOwnPropertySymbols, Zi = Object.getPrototypeOf, wa = Object.prototype.hasOwnProperty, Xi = Object.prototype.propertyIsEnumerable;
  var Oa = (e, t, u) => t in e ? su(e, t, { enumerable: true, configurable: true, writable: true, value: u }) : e[t] = u, L = (e, t) => {
    for (var u in t || (t = {})) wa.call(t, u) && Oa(e, u, t[u]);
    if (La) for (var u of La(t)) Xi.call(t, u) && Oa(e, u, t[u]);
    return e;
  }, _e = (e, t) => Wi(e, qi(t));
  var ji = (e, t) => () => {
    try {
      return t || e((t = { exports: {} }).exports, t), t.exports;
    } catch (u) {
      throw t = 0, u;
    }
  }, Ae = (e, t) => {
    for (var u in t) su(e, u, { get: t[u], enumerable: true });
  }, zi = (e, t, u, r) => {
    if (t && typeof t == "object" || typeof t == "function") for (let i of Vi(t)) !wa.call(e, i) && i !== u && su(e, i, { get: () => t[i], enumerable: !(r = Ji(t, i)) || r.enumerable });
    return e;
  };
  var ze = (e, t, u) => (u = e != null ? Ki(Zi(e)) : {}, zi(t || !e || !e.__esModule ? su(u, "default", { value: e, enumerable: true }) : u, e));
  var Ke = ji((x1, I0) => {
    I0.exports = { trueFunc: function() {
      return true;
    }, falseFunc: function() {
      return false;
    } };
  });
  var Ba = {};
  Ae(Ba, { contains: () => Ft, load: () => pd, merge: () => Rr });
  var Lr = {};
  Ae(Lr, { contains: () => Ft, extract: () => Vn, html: () => Kn, merge: () => Rr, parseHTML: () => Jn, root: () => qn, text: () => at, xml: () => Wn });
  var Fe = {};
  Ae(Fe, { DocumentPosition: () => Ee, append: () => Nn, appendChild: () => xn, compareDocumentPosition: () => za, existsOne: () => Xa, filter: () => ft, find: () => pu, findAll: () => Bn, findOne: () => gu, findOneChild: () => yn, getAttributeValue: () => Tn, getChildren: () => lt, getElementById: () => wn, getElements: () => On, getElementsByClassName: () => kn, getElementsByTagName: () => rt, getElementsByTagType: () => Fn, getFeed: () => Br, getInnerHTML: () => gn, getName: () => Cn, getOuterHTML: () => Va, getParent: () => Za, getSiblings: () => Dr, getText: () => bu, hasAttrib: () => In, hasChildren: () => k, innerText: () => wt, isCDATA: () => ot, isComment: () => ut, isDocument: () => me, isTag: () => _, isText: () => se, nextElementSibling: () => mu, prepend: () => Dn, prependChild: () => Sn, prevElementSibling: () => Eu, removeElement: () => ke, removeSubsets: () => Mn, replaceElement: () => _n, testElement: () => Ln, textContent: () => we, uniqueSort: () => Ye });
  var de = {};
  Ae(de, { CDATA: () => br, Comment: () => dr, Directive: () => Ar, Doctype: () => mr, ElementType: () => R, Root: () => cr, Script: () => lr, Style: () => fr, Tag: () => hr, Text: () => or, isTag: () => sr });
  var R;
  (function(e) {
    e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype";
  })(R || (R = {}));
  function sr(e) {
    return e.type === R.Tag || e.type === R.Script || e.type === R.Style;
  }
  var cr = R.Root, or = R.Text, Ar = R.Directive, dr = R.Comment, lr = R.Script, fr = R.Style, hr = R.Tag, br = R.CDATA, mr = R.Doctype;
  var cu = class {
    constructor() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    get parentNode() {
      return this.parent;
    }
    set parentNode(t) {
      this.parent = t;
    }
    get previousSibling() {
      return this.prev;
    }
    set previousSibling(t) {
      this.prev = t;
    }
    get nextSibling() {
      return this.next;
    }
    set nextSibling(t) {
      this.next = t;
    }
    cloneNode(t = false) {
      return At(this, t);
    }
  }, Bt = class extends cu {
    constructor(t) {
      super(), this.data = t;
    }
    get nodeValue() {
      return this.data;
    }
    set nodeValue(t) {
      this.data = t;
    }
  }, De = class extends Bt {
    constructor() {
      super(...arguments), this.type = R.Text;
    }
    get nodeType() {
      return 3;
    }
  }, $e = class extends Bt {
    constructor() {
      super(...arguments), this.type = R.Comment;
    }
    get nodeType() {
      return 8;
    }
  }, et = class extends Bt {
    constructor(t, u) {
      super(u), this.name = t, this.type = R.Directive;
    }
    get nodeType() {
      return 1;
    }
  }, Rt = class extends cu {
    constructor(t) {
      super(), this.children = t;
    }
    get firstChild() {
      var t;
      return (t = this.children[0]) !== null && t !== void 0 ? t : null;
    }
    get lastChild() {
      return this.children.length > 0 ? this.children[this.children.length - 1] : null;
    }
    get childNodes() {
      return this.children;
    }
    set childNodes(t) {
      this.children = t;
    }
  }, Lt = class extends Rt {
    constructor() {
      super(...arguments), this.type = R.CDATA;
    }
    get nodeType() {
      return 4;
    }
  }, le = class extends Rt {
    constructor() {
      super(...arguments), this.type = R.Root;
    }
    get nodeType() {
      return 9;
    }
  }, tt = class extends Rt {
    constructor(t, u, r = [], i = t === "script" ? R.Script : t === "style" ? R.Style : R.Tag) {
      super(r), this.name = t, this.attribs = u, this.type = i;
    }
    get nodeType() {
      return 1;
    }
    get tagName() {
      return this.name;
    }
    set tagName(t) {
      this.name = t;
    }
    get attributes() {
      return Object.keys(this.attribs).map((t) => {
        var u, r;
        return { name: t, value: this.attribs[t], namespace: (u = this["x-attribsNamespace"]) === null || u === void 0 ? void 0 : u[t], prefix: (r = this["x-attribsPrefix"]) === null || r === void 0 ? void 0 : r[t] };
      });
    }
  };
  function _(e) {
    return sr(e);
  }
  function ot(e) {
    return e.type === R.CDATA;
  }
  function se(e) {
    return e.type === R.Text;
  }
  function ut(e) {
    return e.type === R.Comment;
  }
  function ou(e) {
    return e.type === R.Directive;
  }
  function me(e) {
    return e.type === R.Root;
  }
  function k(e) {
    return Object.prototype.hasOwnProperty.call(e, "children");
  }
  function At(e, t = false) {
    let u;
    if (se(e)) u = new De(e.data);
    else if (ut(e)) u = new $e(e.data);
    else if (_(e)) {
      let r = t ? Er(e.children) : [], i = new tt(e.name, L({}, e.attribs), r);
      r.forEach((n) => n.parent = i), e.namespace != null && (i.namespace = e.namespace), e["x-attribsNamespace"] && (i["x-attribsNamespace"] = L({}, e["x-attribsNamespace"])), e["x-attribsPrefix"] && (i["x-attribsPrefix"] = L({}, e["x-attribsPrefix"])), u = i;
    } else if (ot(e)) {
      let r = t ? Er(e.children) : [], i = new Lt(r);
      r.forEach((n) => n.parent = i), u = i;
    } else if (me(e)) {
      let r = t ? Er(e.children) : [], i = new le(r);
      r.forEach((n) => n.parent = i), e["x-mode"] && (i["x-mode"] = e["x-mode"]), u = i;
    } else if (ou(e)) {
      let r = new et(e.name, e.data);
      e["x-name"] != null && (r["x-name"] = e["x-name"], r["x-publicId"] = e["x-publicId"], r["x-systemId"] = e["x-systemId"]), u = r;
    } else throw new Error("Not implemented yet: ".concat(e.type));
    return u.startIndex = e.startIndex, u.endIndex = e.endIndex, e.sourceCodeLocation != null && (u.sourceCodeLocation = e.sourceCodeLocation), u;
  }
  function Er(e) {
    let t = e.map((u) => At(u, true));
    for (let u = 1; u < t.length; u++) t[u].prev = t[u - 1], t[u - 1].next = t[u];
    return t;
  }
  var ka = { withStartIndices: false, withEndIndices: false, xmlMode: false }, dt = class {
    constructor(t, u, r) {
      this.dom = [], this.root = new le(this.dom), this.done = false, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof u == "function" && (r = u, u = ka), typeof t == "object" && (u = t, t = void 0), this.callback = t != null ? t : null, this.options = u != null ? u : ka, this.elementCB = r != null ? r : null;
    }
    onparserinit(t) {
      this.parser = t;
    }
    onreset() {
      this.dom = [], this.root = new le(this.dom), this.done = false, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
    }
    onend() {
      this.done || (this.done = true, this.parser = null, this.handleCallback(null));
    }
    onerror(t) {
      this.handleCallback(t);
    }
    onclosetag() {
      this.lastNode = null;
      let t = this.tagStack.pop();
      this.options.withEndIndices && (t.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(t);
    }
    onopentag(t, u) {
      let r = this.options.xmlMode ? R.Tag : void 0, i = new tt(t, u, void 0, r);
      this.addNode(i), this.tagStack.push(i);
    }
    ontext(t) {
      let { lastNode: u } = this;
      if (u && u.type === R.Text) u.data += t, this.options.withEndIndices && (u.endIndex = this.parser.endIndex);
      else {
        let r = new De(t);
        this.addNode(r), this.lastNode = r;
      }
    }
    oncomment(t) {
      if (this.lastNode && this.lastNode.type === R.Comment) {
        this.lastNode.data += t;
        return;
      }
      let u = new $e(t);
      this.addNode(u), this.lastNode = u;
    }
    oncommentend() {
      this.lastNode = null;
    }
    oncdatastart() {
      let t = new De(""), u = new Lt([t]);
      this.addNode(u), t.parent = u, this.lastNode = t;
    }
    oncdataend() {
      this.lastNode = null;
    }
    onprocessinginstruction(t, u) {
      let r = new et(t, u);
      this.addNode(r);
    }
    handleCallback(t) {
      if (typeof this.callback == "function") this.callback(t, this.dom);
      else if (t) throw t;
    }
    addNode(t) {
      let u = this.tagStack[this.tagStack.length - 1], r = u.children[u.children.length - 1];
      this.options.withStartIndices && (t.startIndex = this.parser.startIndex), this.options.withEndIndices && (t.endIndex = this.parser.endIndex), u.children.push(t), r && (t.prev = r, r.next = t), t.parent = u, this.lastNode = null;
    }
  };
  var Fa = new Uint16Array('\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((e) => e.charCodeAt(0)));
  var Ma = new Uint16Array("\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((e) => e.charCodeAt(0)));
  var pr, $i = /* @__PURE__ */ new Map([[0, 65533], [128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]), gr = (pr = String.fromCodePoint) !== null && pr !== void 0 ? pr : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  };
  function Tr(e) {
    var t;
    return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = $i.get(e)) !== null && t !== void 0 ? t : e;
  }
  var Z;
  (function(e) {
    e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
  })(Z || (Z = {}));
  var en = 32, Qe;
  (function(e) {
    e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(Qe || (Qe = {}));
  function Ir(e) {
    return e >= Z.ZERO && e <= Z.NINE;
  }
  function tn(e) {
    return e >= Z.UPPER_A && e <= Z.UPPER_F || e >= Z.LOWER_A && e <= Z.LOWER_F;
  }
  function un(e) {
    return e >= Z.UPPER_A && e <= Z.UPPER_Z || e >= Z.LOWER_A && e <= Z.LOWER_Z || Ir(e);
  }
  function rn(e) {
    return e === Z.EQUALS || un(e);
  }
  var V;
  (function(e) {
    e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
  })(V || (V = {}));
  var Oe;
  (function(e) {
    e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
  })(Oe || (Oe = {}));
  var Au = class {
    constructor(t, u, r) {
      this.decodeTree = t, this.emitCodePoint = u, this.errors = r, this.state = V.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Oe.Strict;
    }
    startEntity(t) {
      this.decodeMode = t, this.state = V.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
    }
    write(t, u) {
      switch (this.state) {
        case V.EntityStart:
          return t.charCodeAt(u) === Z.NUM ? (this.state = V.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = V.NamedEntity, this.stateNamedEntity(t, u));
        case V.NumericStart:
          return this.stateNumericStart(t, u);
        case V.NumericDecimal:
          return this.stateNumericDecimal(t, u);
        case V.NumericHex:
          return this.stateNumericHex(t, u);
        case V.NamedEntity:
          return this.stateNamedEntity(t, u);
      }
    }
    stateNumericStart(t, u) {
      return u >= t.length ? -1 : (t.charCodeAt(u) | en) === Z.LOWER_X ? (this.state = V.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = V.NumericDecimal, this.stateNumericDecimal(t, u));
    }
    addToNumericResult(t, u, r, i) {
      if (u !== r) {
        let n = r - u;
        this.result = this.result * Math.pow(i, n) + parseInt(t.substr(u, n), i), this.consumed += n;
      }
    }
    stateNumericHex(t, u) {
      let r = u;
      for (; u < t.length; ) {
        let i = t.charCodeAt(u);
        if (Ir(i) || tn(i)) u += 1;
        else return this.addToNumericResult(t, r, u, 16), this.emitNumericEntity(i, 3);
      }
      return this.addToNumericResult(t, r, u, 16), -1;
    }
    stateNumericDecimal(t, u) {
      let r = u;
      for (; u < t.length; ) {
        let i = t.charCodeAt(u);
        if (Ir(i)) u += 1;
        else return this.addToNumericResult(t, r, u, 10), this.emitNumericEntity(i, 2);
      }
      return this.addToNumericResult(t, r, u, 10), -1;
    }
    emitNumericEntity(t, u) {
      var r;
      if (this.consumed <= u) return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      if (t === Z.SEMI) this.consumed += 1;
      else if (this.decodeMode === Oe.Strict) return 0;
      return this.emitCodePoint(Tr(this.result), this.consumed), this.errors && (t !== Z.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
    }
    stateNamedEntity(t, u) {
      let { decodeTree: r } = this, i = r[this.treeIndex], n = (i & Qe.VALUE_LENGTH) >> 14;
      for (; u < t.length; u++, this.excess++) {
        let s = t.charCodeAt(u);
        if (this.treeIndex = an(r, i, this.treeIndex + Math.max(1, n), s), this.treeIndex < 0) return this.result === 0 || this.decodeMode === Oe.Attribute && (n === 0 || rn(s)) ? 0 : this.emitNotTerminatedNamedEntity();
        if (i = r[this.treeIndex], n = (i & Qe.VALUE_LENGTH) >> 14, n !== 0) {
          if (s === Z.SEMI) return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
          this.decodeMode !== Oe.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
        }
      }
      return -1;
    }
    emitNotTerminatedNamedEntity() {
      var t;
      let { result: u, decodeTree: r } = this, i = (r[u] & Qe.VALUE_LENGTH) >> 14;
      return this.emitNamedEntityData(u, i, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
    }
    emitNamedEntityData(t, u, r) {
      let { decodeTree: i } = this;
      return this.emitCodePoint(u === 1 ? i[t] & ~Qe.VALUE_LENGTH : i[t + 1], r), u === 3 && this.emitCodePoint(i[t + 2], r), r;
    }
    end() {
      var t;
      switch (this.state) {
        case V.NamedEntity:
          return this.result !== 0 && (this.decodeMode !== Oe.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        case V.NumericDecimal:
          return this.emitNumericEntity(0, 2);
        case V.NumericHex:
          return this.emitNumericEntity(0, 3);
        case V.NumericStart:
          return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        case V.EntityStart:
          return 0;
      }
    }
  };
  function Pa(e) {
    let t = "", u = new Au(e, (r) => t += gr(r));
    return function(i, n) {
      let s = 0, A = 0;
      for (; (A = i.indexOf("&", A)) >= 0; ) {
        t += i.slice(s, A), u.startEntity(n);
        let f = u.write(i, A + 1);
        if (f < 0) {
          s = A + u.end();
          break;
        }
        s = A + f, A = f === 0 ? s + 1 : s;
      }
      let l = t + i.slice(s);
      return t = "", l;
    };
  }
  function an(e, t, u, r) {
    let i = (t & Qe.BRANCH_LENGTH) >> 7, n = t & Qe.JUMP_TABLE;
    if (i === 0) return n !== 0 && r === n ? u : -1;
    if (n) {
      let l = r - n;
      return l < 0 || l >= i ? -1 : e[u + l] - 1;
    }
    let s = u, A = s + i - 1;
    for (; s <= A; ) {
      let l = s + A >>> 1, f = e[l];
      if (f < r) s = l + 1;
      else if (f > r) A = l - 1;
      else return e[l + i];
    }
    return -1;
  }
  var vd = Pa(Fa), Ud = Pa(Ma);
  function du(e) {
    for (let t = 1; t < e.length; t++) e[t][0] += e[t - 1][0] + 1;
    return e;
  }
  var nn = new Map(du([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(du([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(du([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(du([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
  var Cr = /["&'<>$\x80-\uFFFF]/g, va = /* @__PURE__ */ new Map([[34, "&quot;"], [38, "&amp;"], [39, "&apos;"], [60, "&lt;"], [62, "&gt;"]]), Ua = String.prototype.codePointAt != null ? (e, t) => e.codePointAt(t) : (e, t) => (e.charCodeAt(t) & 64512) === 55296 ? (e.charCodeAt(t) - 55296) * 1024 + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t);
  function Ot(e) {
    let t = "", u = 0, r;
    for (; (r = Cr.exec(e)) !== null; ) {
      let i = r.index, n = e.charCodeAt(i), s = va.get(n);
      s !== void 0 ? (t += e.substring(u, i) + s, u = i + 1) : (t += "".concat(e.substring(u, i), "&#x").concat(Ua(e, i).toString(16), ";"), u = Cr.lastIndex += +((n & 64512) === 55296));
    }
    return t + e.substr(u);
  }
  function _r(e, t) {
    return function(r) {
      let i, n = 0, s = "";
      for (; i = e.exec(r); ) n !== i.index && (s += r.substring(n, i.index)), s += t.get(i[0].charCodeAt(0)), n = i.index + 1;
      return s + r.substring(n);
    };
  }
  var Ha = _r(/[&<>'"]/g, va), lu = _r(/["&\u00A0]/g, /* @__PURE__ */ new Map([[34, "&quot;"], [38, "&amp;"], [160, "&nbsp;"]])), fu = _r(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [160, "&nbsp;"]]));
  var Qa;
  (function(e) {
    e[e.XML = 0] = "XML", e[e.HTML = 1] = "HTML";
  })(Qa || (Qa = {}));
  var Ya;
  (function(e) {
    e[e.UTF8 = 0] = "UTF8", e[e.ASCII = 1] = "ASCII", e[e.Extensive = 2] = "Extensive", e[e.Attribute = 3] = "Attribute", e[e.Text = 4] = "Text";
  })(Ya || (Ya = {}));
  var Wa = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map((e) => [e.toLowerCase(), e])), Ja = new Map(["definitionURL", "attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map((e) => [e.toLowerCase(), e]));
  var cn = /* @__PURE__ */ new Set(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);
  function on(e) {
    return e.replace(/"/g, "&quot;");
  }
  function An(e, t) {
    var u;
    if (!e) return;
    let r = ((u = t.encodeEntities) !== null && u !== void 0 ? u : t.decodeEntities) === false ? on : t.xmlMode || t.encodeEntities !== "utf8" ? Ot : lu;
    return Object.keys(e).map((i) => {
      var n, s;
      let A = (n = e[i]) !== null && n !== void 0 ? n : "";
      return t.xmlMode === "foreign" && (i = (s = Ja.get(i)) !== null && s !== void 0 ? s : i), !t.emptyAttrs && !t.xmlMode && A === "" ? i : "".concat(i, '="').concat(r(A), '"');
    }).join(" ");
  }
  var qa = /* @__PURE__ */ new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
  function Sr(e, t = {}) {
    let u = "length" in e ? e : [e], r = "";
    for (let i = 0; i < u.length; i++) r += dn(u[i], t);
    return r;
  }
  var hu = Sr;
  function dn(e, t) {
    switch (e.type) {
      case cr:
        return Sr(e.children, t);
      case mr:
      case Ar:
        return bn(e);
      case dr:
        return pn(e);
      case br:
        return En(e);
      case lr:
      case fr:
      case hr:
        return hn(e, t);
      case or:
        return mn(e, t);
    }
  }
  var ln = /* @__PURE__ */ new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"]), fn = /* @__PURE__ */ new Set(["svg", "math"]);
  function hn(e, t) {
    var u;
    t.xmlMode === "foreign" && (e.name = (u = Wa.get(e.name)) !== null && u !== void 0 ? u : e.name, e.parent && ln.has(e.parent.name) && (t = _e(L({}, t), { xmlMode: false }))), !t.xmlMode && fn.has(e.name) && (t = _e(L({}, t), { xmlMode: "foreign" }));
    let r = "<".concat(e.name), i = An(e.attribs, t);
    return i && (r += " ".concat(i)), e.children.length === 0 && (t.xmlMode ? t.selfClosingTags !== false : t.selfClosingTags && qa.has(e.name)) ? (t.xmlMode || (r += " "), r += "/>") : (r += ">", e.children.length > 0 && (r += Sr(e.children, t)), (t.xmlMode || !qa.has(e.name)) && (r += "</".concat(e.name, ">"))), r;
  }
  function bn(e) {
    return "<".concat(e.data, ">");
  }
  function mn(e, t) {
    var u;
    let r = e.data || "";
    return ((u = t.encodeEntities) !== null && u !== void 0 ? u : t.decodeEntities) !== false && !(!t.xmlMode && e.parent && cn.has(e.parent.name)) && (r = t.xmlMode || t.encodeEntities !== "utf8" ? Ot(r) : fu(r)), r;
  }
  function En(e) {
    return "<![CDATA[".concat(e.children[0].data, "]]>");
  }
  function pn(e) {
    return "<!--".concat(e.data, "-->");
  }
  function Va(e, t) {
    return hu(e, t);
  }
  function gn(e, t) {
    return k(e) ? e.children.map((u) => Va(u, t)).join("") : "";
  }
  function bu(e) {
    return Array.isArray(e) ? e.map(bu).join("") : _(e) ? e.name === "br" ? "\n" : bu(e.children) : ot(e) ? bu(e.children) : se(e) ? e.data : "";
  }
  function we(e) {
    return Array.isArray(e) ? e.map(we).join("") : k(e) && !ut(e) ? we(e.children) : se(e) ? e.data : "";
  }
  function wt(e) {
    return Array.isArray(e) ? e.map(wt).join("") : k(e) && (e.type === R.Tag || ot(e)) ? wt(e.children) : se(e) ? e.data : "";
  }
  function lt(e) {
    return k(e) ? e.children : [];
  }
  function Za(e) {
    return e.parent || null;
  }
  function Dr(e) {
    let t = Za(e);
    if (t != null) return lt(t);
    let u = [e], { prev: r, next: i } = e;
    for (; r != null; ) u.unshift(r), { prev: r } = r;
    for (; i != null; ) u.push(i), { next: i } = i;
    return u;
  }
  function Tn(e, t) {
    var u;
    return (u = e.attribs) === null || u === void 0 ? void 0 : u[t];
  }
  function In(e, t) {
    return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, t) && e.attribs[t] != null;
  }
  function Cn(e) {
    return e.name;
  }
  function mu(e) {
    let { next: t } = e;
    for (; t !== null && !_(t); ) ({ next: t } = t);
    return t;
  }
  function Eu(e) {
    let { prev: t } = e;
    for (; t !== null && !_(t); ) ({ prev: t } = t);
    return t;
  }
  function ke(e) {
    if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
      let t = e.parent.children, u = t.lastIndexOf(e);
      u >= 0 && t.splice(u, 1);
    }
    e.next = null, e.prev = null, e.parent = null;
  }
  function _n(e, t) {
    let u = t.prev = e.prev;
    u && (u.next = t);
    let r = t.next = e.next;
    r && (r.prev = t);
    let i = t.parent = e.parent;
    if (i) {
      let n = i.children;
      n[n.lastIndexOf(e)] = t, e.parent = null;
    }
  }
  function xn(e, t) {
    if (ke(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
      let u = e.children[e.children.length - 2];
      u.next = t, t.prev = u;
    } else t.prev = null;
  }
  function Nn(e, t) {
    ke(t);
    let { parent: u } = e, r = e.next;
    if (t.next = r, t.prev = e, e.next = t, t.parent = u, r) {
      if (r.prev = t, u) {
        let i = u.children;
        i.splice(i.lastIndexOf(r), 0, t);
      }
    } else u && u.children.push(t);
  }
  function Sn(e, t) {
    if (ke(t), t.parent = e, t.prev = null, e.children.unshift(t) !== 1) {
      let u = e.children[1];
      u.prev = t, t.next = u;
    } else t.next = null;
  }
  function Dn(e, t) {
    ke(t);
    let { parent: u } = e;
    if (u) {
      let r = u.children;
      r.splice(r.indexOf(e), 0, t);
    }
    e.prev && (e.prev.next = t), t.parent = u, t.prev = e.prev, t.next = e, e.prev = t;
  }
  function ft(e, t, u = true, r = 1 / 0) {
    return pu(e, Array.isArray(t) ? t : [t], u, r);
  }
  function pu(e, t, u, r) {
    let i = [], n = [Array.isArray(t) ? t : [t]], s = [0];
    for (; ; ) {
      if (s[0] >= n[0].length) {
        if (s.length === 1) return i;
        n.shift(), s.shift();
        continue;
      }
      let A = n[0][s[0]++];
      if (e(A) && (i.push(A), --r <= 0)) return i;
      u && k(A) && A.children.length > 0 && (s.unshift(0), n.unshift(A.children));
    }
  }
  function yn(e, t) {
    return t.find(e);
  }
  function gu(e, t, u = true) {
    let r = Array.isArray(t) ? t : [t];
    for (let i = 0; i < r.length; i++) {
      let n = r[i];
      if (_(n) && e(n)) return n;
      if (u && k(n) && n.children.length > 0) {
        let s = gu(e, n.children, true);
        if (s) return s;
      }
    }
    return null;
  }
  function Xa(e, t) {
    return (Array.isArray(t) ? t : [t]).some((u) => _(u) && e(u) || k(u) && Xa(e, u.children));
  }
  function Bn(e, t) {
    let u = [], r = [Array.isArray(t) ? t : [t]], i = [0];
    for (; ; ) {
      if (i[0] >= r[0].length) {
        if (r.length === 1) return u;
        r.shift(), i.shift();
        continue;
      }
      let n = r[0][i[0]++];
      _(n) && e(n) && u.push(n), k(n) && n.children.length > 0 && (i.unshift(0), r.unshift(n.children));
    }
  }
  var Tu = { tag_name(e) {
    return typeof e == "function" ? (t) => _(t) && e(t.name) : e === "*" ? _ : (t) => _(t) && t.name === e;
  }, tag_type(e) {
    return typeof e == "function" ? (t) => e(t.type) : (t) => t.type === e;
  }, tag_contains(e) {
    return typeof e == "function" ? (t) => se(t) && e(t.data) : (t) => se(t) && t.data === e;
  } };
  function yr(e, t) {
    return typeof t == "function" ? (u) => _(u) && t(u.attribs[e]) : (u) => _(u) && u.attribs[e] === t;
  }
  function Rn(e, t) {
    return (u) => e(u) || t(u);
  }
  function ja(e) {
    let t = Object.keys(e).map((u) => {
      let r = e[u];
      return Object.prototype.hasOwnProperty.call(Tu, u) ? Tu[u](r) : yr(u, r);
    });
    return t.length === 0 ? null : t.reduce(Rn);
  }
  function Ln(e, t) {
    let u = ja(e);
    return u ? u(t) : true;
  }
  function On(e, t, u, r = 1 / 0) {
    let i = ja(e);
    return i ? ft(i, t, u, r) : [];
  }
  function wn(e, t, u = true) {
    return Array.isArray(t) || (t = [t]), gu(yr("id", e), t, u);
  }
  function rt(e, t, u = true, r = 1 / 0) {
    return ft(Tu.tag_name(e), t, u, r);
  }
  function kn(e, t, u = true, r = 1 / 0) {
    return ft(yr("class", e), t, u, r);
  }
  function Fn(e, t, u = true, r = 1 / 0) {
    return ft(Tu.tag_type(e), t, u, r);
  }
  function Mn(e) {
    let t = e.length;
    for (; --t >= 0; ) {
      let u = e[t];
      if (t > 0 && e.lastIndexOf(u, t - 1) >= 0) {
        e.splice(t, 1);
        continue;
      }
      for (let r = u.parent; r; r = r.parent) if (e.includes(r)) {
        e.splice(t, 1);
        break;
      }
    }
    return e;
  }
  var Ee;
  (function(e) {
    e[e.DISCONNECTED = 1] = "DISCONNECTED", e[e.PRECEDING = 2] = "PRECEDING", e[e.FOLLOWING = 4] = "FOLLOWING", e[e.CONTAINS = 8] = "CONTAINS", e[e.CONTAINED_BY = 16] = "CONTAINED_BY";
  })(Ee || (Ee = {}));
  function za(e, t) {
    let u = [], r = [];
    if (e === t) return 0;
    let i = k(e) ? e : e.parent;
    for (; i; ) u.unshift(i), i = i.parent;
    for (i = k(t) ? t : t.parent; i; ) r.unshift(i), i = i.parent;
    let n = Math.min(u.length, r.length), s = 0;
    for (; s < n && u[s] === r[s]; ) s++;
    if (s === 0) return Ee.DISCONNECTED;
    let A = u[s - 1], l = A.children, f = u[s], m = r[s];
    return l.indexOf(f) > l.indexOf(m) ? A === t ? Ee.FOLLOWING | Ee.CONTAINED_BY : Ee.FOLLOWING : A === e ? Ee.PRECEDING | Ee.CONTAINS : Ee.PRECEDING;
  }
  function Ye(e) {
    return e = e.filter((t, u, r) => !r.includes(t, u + 1)), e.sort((t, u) => {
      let r = za(t, u);
      return r & Ee.PRECEDING ? -1 : r & Ee.FOLLOWING ? 1 : 0;
    }), e;
  }
  function Br(e) {
    let t = Iu(Qn, e);
    return t ? t.name === "feed" ? Pn(t) : vn(t) : null;
  }
  function Pn(e) {
    var t;
    let u = e.children, r = { type: "atom", items: rt("entry", u).map((s) => {
      var A;
      let { children: l } = s, f = { media: $a(l) };
      ce(f, "id", "id", l), ce(f, "title", "title", l);
      let m = (A = Iu("link", l)) === null || A === void 0 ? void 0 : A.attribs.href;
      m && (f.link = m);
      let T = Ge("summary", l) || Ge("content", l);
      T && (f.description = T);
      let I = Ge("updated", l);
      return I && (f.pubDate = new Date(I)), f;
    }) };
    ce(r, "id", "id", u), ce(r, "title", "title", u);
    let i = (t = Iu("link", u)) === null || t === void 0 ? void 0 : t.attribs.href;
    i && (r.link = i), ce(r, "description", "subtitle", u);
    let n = Ge("updated", u);
    return n && (r.updated = new Date(n)), ce(r, "author", "email", u, true), r;
  }
  function vn(e) {
    var t, u;
    let r = (u = (t = Iu("channel", e.children)) === null || t === void 0 ? void 0 : t.children) !== null && u !== void 0 ? u : [], i = { type: e.name.substr(0, 3), id: "", items: rt("item", e.children).map((s) => {
      let { children: A } = s, l = { media: $a(A) };
      ce(l, "id", "guid", A), ce(l, "title", "title", A), ce(l, "link", "link", A), ce(l, "description", "description", A);
      let f = Ge("pubDate", A) || Ge("dc:date", A);
      return f && (l.pubDate = new Date(f)), l;
    }) };
    ce(i, "title", "title", r), ce(i, "link", "link", r), ce(i, "description", "description", r);
    let n = Ge("lastBuildDate", r);
    return n && (i.updated = new Date(n)), ce(i, "author", "managingEditor", r, true), i;
  }
  var Un = ["url", "type", "lang"], Hn = ["fileSize", "bitrate", "framerate", "samplingrate", "channels", "duration", "height", "width"];
  function $a(e) {
    return rt("media:content", e).map((t) => {
      let { attribs: u } = t, r = { medium: u.medium, isDefault: !!u.isDefault };
      for (let i of Un) u[i] && (r[i] = u[i]);
      for (let i of Hn) u[i] && (r[i] = parseInt(u[i], 10));
      return u.expression && (r.expression = u.expression), r;
    });
  }
  function Iu(e, t) {
    return rt(e, t, true, 1)[0];
  }
  function Ge(e, t, u = false) {
    return we(rt(e, t, u, 1)).trim();
  }
  function ce(e, t, u, r, i = false) {
    let n = Ge(u, r, i);
    n && (e[t] = n);
  }
  function Qn(e) {
    return e === "rss" || e === "feed" || e === "rdf:RDF";
  }
  var Yn = { _useHtmlParser2: false };
  function kt(e, t) {
    if (!e) return t != null ? t : Yn;
    let u = L(L({ _useHtmlParser2: !!e.xmlMode }, t), e);
    return e.xml ? (u._useHtmlParser2 = true, u.xmlMode = true, e.xml !== true && Object.assign(u, e.xml)) : e.xmlMode && (u._useHtmlParser2 = true), u;
  }
  function t0(e, t, u) {
    return e ? e(t != null ? t : e._root.children, null, void 0, u).toString() : "";
  }
  function Gn(e, t) {
    return !t && typeof e == "object" && e != null && !("length" in e) && !("type" in e);
  }
  function Kn(e, t) {
    let u = Gn(e) ? (t = e, void 0) : e, r = L(L({}, this === null || this === void 0 ? void 0 : this._options), kt(t));
    return t0(this, u, r);
  }
  function Wn(e) {
    let t = _e(L({}, this._options), { xmlMode: true });
    return t0(this, e, t);
  }
  function at(e) {
    let t = e != null ? e : this ? this.root() : [], u = "";
    for (let r = 0; r < t.length; r++) u += we(t[r]);
    return u;
  }
  function Jn(e, t, u = typeof t == "boolean" ? t : false) {
    if (!e || typeof e != "string") return null;
    typeof t == "boolean" && (u = t);
    let r = this.load(e, this._options, false);
    return u || r("script").remove(), [...r.root()[0].children];
  }
  function qn() {
    return this(this._root);
  }
  function Ft(e, t) {
    if (t === e) return false;
    let u = t;
    for (; u && u !== u.parent; ) if (u = u.parent, u === e) return true;
    return false;
  }
  function Vn(e) {
    return this.root().extract(e);
  }
  function Rr(e, t) {
    if (!e0(e) || !e0(t)) return;
    let u = e.length, r = +t.length;
    for (let i = 0; i < r; i++) e[u++] = t[i];
    return e.length = u, e;
  }
  function e0(e) {
    if (Array.isArray(e)) return true;
    if (typeof e != "object" || e === null || !("length" in e) || typeof e.length != "number" || e.length < 0) return false;
    for (let t = 0; t < e.length; t++) if (!(t in e)) return false;
    return true;
  }
  var Ur = {};
  Ae(Ur, { addClass: () => b0, attr: () => is, data: () => os, hasClass: () => ls, prop: () => ns, removeAttr: () => ds, removeClass: () => m0, toggleClass: () => E0, val: () => As });
  function pe(e) {
    return e.cheerio != null;
  }
  function u0(e) {
    return e.replace(/[._-](\w|$)/g, (t, u) => u.toUpperCase());
  }
  function r0(e) {
    return e.replace(/[A-Z]/g, "-$&").toLowerCase();
  }
  function P(e, t) {
    let u = e.length;
    for (let r = 0; r < u; r++) t(e[r], r);
    return e;
  }
  var it;
  (function(e) {
    e[e.LowerA = 97] = "LowerA", e[e.LowerZ = 122] = "LowerZ", e[e.UpperA = 65] = "UpperA", e[e.UpperZ = 90] = "UpperZ", e[e.Exclamation = 33] = "Exclamation";
  })(it || (it = {}));
  function Mt(e) {
    if (typeof e != "string") return false;
    let t = e.indexOf("<");
    if (t === -1 || t > e.length - 3) return false;
    let u = e.charCodeAt(t + 1);
    return (u >= it.LowerA && u <= it.LowerZ || u >= it.UpperA && u <= it.UpperZ || u === it.Exclamation) && e.includes(">", t + 2);
  }
  var Or, Zn = /* @__PURE__ */ new Map([[0, 65533], [128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]), Pt = (Or = String.fromCodePoint) !== null && Or !== void 0 ? Or : ((e) => {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  });
  function wr(e) {
    var t;
    return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Zn.get(e)) !== null && t !== void 0 ? t : e;
  }
  function Cu(e) {
    let t = typeof atob == "function" ? atob(e) : typeof Buffer.from == "function" ? Buffer.from(e, "base64").toString("binary") : new Buffer(e, "base64").toString("binary"), u = t.length & -2, r = new Uint16Array(u / 2);
    for (let i = 0, n = 0; i < u; i += 2) {
      let s = t.charCodeAt(i), A = t.charCodeAt(i + 1);
      r[n++] = s | A << 8;
    }
    return r;
  }
  var _u = Cu("QR08ALkAAgH6AYsDNQR2BO0EPgXZBQEGLAbdBxMISQrvCmQLfQurDKQNLw4fD4YPpA+6D/IPAAAAAAAAAAAAAAAAKhBMEY8TmxUWF2EYLBkxGuAa3RsJHDscWR8YIC8jSCSIJcMl6ie3Ku8rEC0CLjoupS7kLgAIRU1hYmNmZ2xtbm9wcnN0dVQAWgBeAGUAaQBzAHcAfgCBAIQAhwCSAJoAoACsALMAbABpAGcAO4DGAMZAUAA7gCYAJkBjAHUAdABlADuAwQDBQHIiZXZlAAJhAAFpeW0AcgByAGMAO4DCAMJAEGRyAADgNdgE3XIAYQB2AGUAO4DAAMBA8CFoYZFj4SFjcgBhZAAAoFMqAAFncIsAjgBvAG4ABGFmAADgNdg43fAlbHlGdW5jdGlvbgCgYSBpAG4AZwA7gMUAxUAAAWNzpACoAHIAAOA12Jzc6SFnbgCgVCJpAGwAZABlADuAwwDDQG0AbAA7gMQAxEAABGFjZWZvcnN1xQDYANoA7QDxAPYA+QD8AAABY3LJAM8AayNzbGFzaAAAoBYidgHTANUAAKDnKmUAZAAAoAYjeQARZIABY3J0AOAA5QDrAGEidXNlAACgNSLuI291bGxpcwCgLCFhAJJjcgAA4DXYBd1wAGYAAOA12Dnd5SF2ZdhiYwDyAOoAbSJwZXEAAKBOIgAHSE9hY2RlZmhpbG9yc3UXARoBHwE6AVIBVQFiAWQBZgGCAakB6QHtAfIBYwB5ACdkUABZADuAqQCpQIABY3B5ACUBKAE1AfUhdGUGYWmg0iJ0KGFsRGlmZmVyZW50aWFsRAAAoEUhbCJleXMAAKAtIQACYWVpb0EBRAFKAU0B8iFvbgxhZABpAGwAO4DHAMdAcgBjAAhhbiJpbnQAAKAwIm8AdAAKYQABZG5ZAV0BaSJsbGEAuGB0I2VyRG90ALdg8gA5AWkAp2NyImNsZQAAAkRNUFRwAXQBeQF9AW8AdAAAoJkiaSJudXMAAKCWIuwhdXMAoJUiaSJtZXMAAKCXIm8AAAFjc4cBlAFrKndpc2VDb250b3VySW50ZWdyYWwAAKAyImUjQ3VybHkAAAFEUZwBpAFvJXVibGVRdW90ZQAAoB0gdSJvdGUAAKAZIAACbG5wdbABtgHNAdgBbwBuAGWgNyIAoHQqgAFnaXQAvAHBAcUB8iJ1ZW50AKBhIm4AdAAAoC8i7yV1ckludGVncmFsAKAuIgABZnLRAdMBAKACIe8iZHVjdACgECJuLnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbAAAoDMi7yFzcwCgLypjAHIAAOA12J7ccABDoNMiYQBwAACgTSKABURKU1phY2VmaW9zAAsCEgIVAhgCGwIsAjQCOQI9AnMCfwNvoEUh9CJyYWhkAKARKWMAeQACZGMAeQAFZGMAeQAPZIABZ3JzACECJQIoAuchZXIAoCEgcgAAoKEhaAB2AACg5CoAAWF5MAIzAvIhb24OYRRkbAB0oAciYQCUY3IAAOA12AfdAAFhZkECawIAAWNtRQJnAvIjaXRpY2FsAAJBREdUUAJUAl8CYwJjInV0ZQC0YG8AdAFZAloC2WJiJGxlQWN1dGUA3WJyImF2ZQBgYGkibGRlANxi7yFuZACgxCJmJWVyZW50aWFsRAAAoEYhcAR9AgAAAAAAAIECjgIAABoDZgAA4DXYO91EoagAhQKJAm8AdAAAoNwgcSJ1YWwAAKBQIuIhbGUAA0NETFJVVpkCqAK1Au8C/wIRA28AbgB0AG8AdQByAEkAbgB0AGUAZwByAGEA7ADEAW8AdAKvAgAAAACwAqhgbiNBcnJvdwAAoNMhAAFlb7kC0AJmAHQAgAFBUlQAwQLGAs0CciJyb3cAAKDQIekkZ2h0QXJyb3cAoNQhZQDlACsCbgBnAAABTFLWAugC5SFmdAABQVLcAuECciJyb3cAAKD4J+kkZ2h0QXJyb3cAoPon6SRnaHRBcnJvdwCg+SdpImdodAAAAUFU9gL7AnIicm93AACg0iFlAGUAAKCoInAAQQIGAwAAAAALA3Iicm93AACg0SFvJHduQXJyb3cAAKDVIWUlcnRpY2FsQmFyAACgJSJuAAADQUJMUlRhJAM2AzoDWgNxA3oDciJyb3cAAKGTIUJVLAMwA2EAcgAAoBMpcCNBcnJvdwAAoPUhciJldmUAEWPlIWZ00gJDAwAASwMAAFIDaSVnaHRWZWN0b3IAAKBQKWUkZVZlY3RvcgAAoF4p5SJjdG9yQqC9IWEAcgAAoFYpaSJnaHQA1AFiAwAAaQNlJGVWZWN0b3IAAKBfKeUiY3RvckKgwSFhAHIAAKBXKWUAZQBBoKQiciJyb3cAAKCnIXIAcgBvAPcAtAIAAWN0gwOHA3IAAOA12J/c8iFvaxBhAAhOVGFjZGZnbG1vcHFzdHV4owOlA6kDsAO/A8IDxgPNA9ID8gP9AwEEFAQeBCAEJQRHAEphSAA7gNAA0EBjAHUAdABlADuAyQDJQIABYWl5ALYDuQO+A/Ihb24aYXIAYwA7gMoAykAtZG8AdAAWYXIAAOA12AjdcgBhAHYAZQA7gMgAyEDlIm1lbnQAoAgiAAFhcNYD2QNjAHIAEmF0AHkAUwLhAwAAAADpA20lYWxsU3F1YXJlAACg+yVlJ3J5U21hbGxTcXVhcmUAAKCrJQABZ3D2A/kDbwBuABhhZgAA4DXYPN3zImlsb26VY3UAAAFhaQYEDgRsAFSgdSppImxkZQAAoEIi7CNpYnJpdW0AoMwhAAFjaRgEGwRyAACgMCFtAACgcyphAJdjbQBsADuAywDLQAABaXApBC0E8yF0cwCgAyLvJG5lbnRpYWxFAKBHIYACY2Zpb3MAPQQ/BEMEXQRyBHkAJGRyAADgNdgJ3WwibGVkAFMCTAQAAAAAVARtJWFsbFNxdWFyZQAAoPwlZSdyeVNtYWxsU3F1YXJlAACgqiVwA2UEAABpBAAAAABtBGYAAOA12D3dwSFsbACgACLyI2llcnRyZgCgMSFjAPIAcQQABkpUYWJjZGZnb3JzdIgEiwSOBJMElwSkBKcEqwStBLIE5QTqBGMAeQADZDuAPgA+QO0hbWFkoJMD3GNyImV2ZQAeYYABZWl5AJ0EoASjBOQhaWwiYXIAYwAcYRNkbwB0ACBhcgAA4DXYCt0AoNkicABmAADgNdg+3eUiYXRlcgADRUZHTFNUvwTIBM8E1QTZBOAEcSJ1YWwATKBlIuUhc3MAoNsidSRsbEVxdWFsAACgZyJyI2VhdGVyAACgoirlIXNzAKB3IuwkYW50RXF1YWwAoH4qaSJsZGUAAKBzImMAcgAA4DXYotwAoGsiAARBYWNmaW9zdfkE/QQFBQgFCwUTBSIFKwVSIkRjeQAqZAABY3QBBQQFZQBrAMdiXmDpIXJjJGFyAACgDCFsJWJlcnRTcGFjZQAAoAsh8AEYBQAAGwVmAACgDSHpJXpvbnRhbExpbmUAoAAlAAFjdCYFKAXyABIF8iFvayZhbQBwAEQBMQU5BW8AdwBuAEgAdQBtAPAAAAFxInVhbAAAoE8iAAdFSk9hY2RmZ21ub3N0dVMFVgVZBVwFYwVtBXAFcwV6BZAFtgXFBckFzQVjAHkAFWTsIWlnMmFjAHkAAWRjAHUAdABlADuAzQDNQAABaXlnBWwFcgBjADuAzgDOQBhkbwB0ADBhcgAAoBEhcgBhAHYAZQA7gMwAzEAAoREhYXB/BYsFAAFjZ4MFhQVyACphaSNuYXJ5SQAAoEghbABpAGUA8wD6AvQBlQUAAKUFZaAsIgABZ3KaBZ4F8iFhbACgKyLzI2VjdGlvbgCgwiJpI3NpYmxlAAABQ1SsBbEFbyJtbWEAAKBjIGkibWVzAACgYiCAAWdwdAC8Bb8FwwVvAG4ALmFmAADgNdhA3WEAmWNjAHIAAKAQIWkibGRlAChh6wHSBQAA1QVjAHkABmRsADuAzwDPQIACY2Zvc3UA4QXpBe0F8gX9BQABaXnlBegFcgBjADRhGWRyAADgNdgN3XAAZgAA4DXYQd3jAfcFAAD7BXIAAOA12KXc8iFjeQhk6yFjeQRkgANISmFjZm9zAAwGDwYSBhUGHQYhBiYGYwB5ACVkYwB5AAxk8CFwYZpjAAFleRkGHAbkIWlsNmEaZHIAAOA12A7dcABmAADgNdhC3WMAcgAA4DXYptyABUpUYWNlZmxtb3N0AD0GQAZDBl4GawZkB2gHcAd0B80H2gdjAHkACWQ7gDwAPECAAmNtbnByAEwGTwZSBlUGWwb1IXRlOWHiIWRhm2NnAACg6ifsI2FjZXRyZgCgEiFyAACgniGAAWFleQBkBmcGagbyIW9uPWHkIWlsO2EbZAABZnNvBjQHdAAABUFDREZSVFVWYXKABp4GpAbGBssG3AYDByEHwQIqBwABbnKEBowGZyVsZUJyYWNrZXQAAKDoJ/Ihb3cAoZAhQlKTBpcGYQByAACg5CHpJGdodEFycm93AKDGIWUjaWxpbmcAAKAII28A9QGqBgAAsgZiJWxlQnJhY2tldAAAoOYnbgDUAbcGAAC+BmUkZVZlY3RvcgAAoGEp5SJjdG9yQqDDIWEAcgAAoFkpbCJvb3IAAKAKI2kiZ2h0AAABQVbSBtcGciJyb3cAAKCUIeUiY3RvcgCgTikAAWVy4AbwBmUAAKGjIkFW5gbrBnIicm93AACgpCHlImN0b3IAoFopaSNhbmdsZQBCorIi+wYAAAAA/wZhAHIAAKDPKXEidWFsAACgtCJwAIABRFRWAAoHEQcYB+8kd25WZWN0b3IAoFEpZSRlVmVjdG9yAACgYCnlImN0b3JCoL8hYQByAACgWCnlImN0b3JCoLwhYQByAACgUilpAGcAaAB0AGEAcgByAG8A9wDMAnMAAANFRkdMU1Q/B0cHTgdUB1gHXwfxJXVhbEdyZWF0ZXIAoNoidSRsbEVxdWFsAACgZiJyI2VhdGVyAACgdiLlIXNzAKChKuwkYW50RXF1YWwAoH0qaSJsZGUAAKByInIAAOA12A/dZaDYIuYjdGFycm93AKDaIWkiZG90AD9hgAFucHcAege1B7kHZwAAAkxSbHKCB5QHmwerB+UhZnQAAUFSiAeNB3Iicm93AACg9SfpJGdodEFycm93AKD3J+kkZ2h0QXJyb3cAoPYn5SFmdAABYXLcAqEHaQBnAGgAdABhAHIAcgBvAPcA5wJpAGcAaAB0AGEAcgByAG8A9wDuAmYAAOA12EPdZQByAAABTFK/B8YHZSRmdEFycm93AACgmSHpJGdodEFycm93AKCYIYABY2h0ANMH1QfXB/IAWgYAoLAh8iFva0FhAKBqIgAEYWNlZmlvc3XpB+wH7gf/BwMICQgOCBEIcAAAoAUpeQAcZAABZGzyB/kHaSR1bVNwYWNlAACgXyBsI2ludHJmAACgMyFyAADgNdgQ3e4jdXNQbHVzAKATInAAZgAA4DXYRN1jAPIA/gecY4AESmFjZWZvc3R1ACEIJAgoCDUIgQiFCDsKQApHCmMAeQAKZGMidXRlAENhgAFhZXkALggxCDQI8iFvbkdh5CFpbEVhHWSAAWdzdwA7CGEIfQjhInRpdmWAAU1UVgBECEwIWQhlJWRpdW1TcGFjZQAAoAsgaABpAAABY25SCFMIawBTAHAAYQBjAOUASwhlAHIAeQBUAGgAaQDuAFQI9CFlZAABR0xnCHUIcgBlAGEAdABlAHIARwByAGUAYQB0AGUA8gDrBGUAcwBzAEwAZQBzAPMA2wdMImluZQAKYHIAAOA12BHdAAJCbnB0jAiRCJkInAhyImVhawAAoGAgwiZyZWFraW5nU3BhY2WgYGYAAKAVIUOq7CqzCMIIzQgAAOcIGwkAAAAAAAAtCQAAbwkAAIcJAACdCcAJGQoAADQKAAFvdbYIvAjuI2dydWVudACgYiJwIkNhcAAAoG0ibyh1YmxlVmVydGljYWxCYXIAAKAmIoABbHF4ANII1wjhCOUibWVudACgCSL1IWFsVKBgImkibGRlAADgQiI4A2kic3RzAACgBCJyI2VhdGVyAACjbyJFRkdMU1T1CPoIAgkJCQ0JFQlxInVhbAAAoHEidSRsbEVxdWFsAADgZyI4A3IjZWF0ZXIAAOBrIjgD5SFzcwCgeSLsJGFudEVxdWFsAOB+KjgDaSJsZGUAAKB1IvUhbXBEASAJJwnvI3duSHVtcADgTiI4A3EidWFsAADgTyI4A2UAAAFmczEJRgn0JFRyaWFuZ2xlQqLqIj0JAAAAAEIJYQByAADgzyk4A3EidWFsAACg7CJzAICibiJFR0xTVABRCVYJXAlhCWkJcSJ1YWwAAKBwInIjZWF0ZXIAAKB4IuUhc3MA4GoiOAPsJGFudEVxdWFsAOB9KjgDaSJsZGUAAKB0IuUic3RlZAABR0x1CX8J8iZlYXRlckdyZWF0ZXIA4KIqOAPlI3NzTGVzcwDgoSo4A/IjZWNlZGVzAKGAIkVTjwmVCXEidWFsAADgryo4A+wkYW50RXF1YWwAoOAiAAFlaaAJqQl2JmVyc2VFbGVtZW50AACgDCLnJWh0VHJpYW5nbGVCousitgkAAAAAuwlhAHIAAODQKTgDcSJ1YWwAAKDtIgABcXXDCeAJdSNhcmVTdQAAAWJwywnVCfMhZXRF4I8iOANxInVhbAAAoOIi5SJyc2V0ReCQIjgDcSJ1YWwAAKDjIoABYmNwAOYJ8AkNCvMhZXRF4IIi0iBxInVhbAAAoIgi4yJlZWRzgKGBIkVTVAD6CQAKBwpxInVhbAAA4LAqOAPsJGFudEVxdWFsAKDhImkibGRlAADgfyI4A+UicnNldEXggyLSIHEidWFsAACgiSJpImxkZQCAoUEiRUZUACIKJwouCnEidWFsAACgRCJ1JGxsRXF1YWwAAKBHImkibGRlAACgSSJlJXJ0aWNhbEJhcgAAoCQiYwByAADgNdip3GkAbABkAGUAO4DRANFAnWMAB0VhY2RmZ21vcHJzdHV2XgphCmgKcgp2CnoKgQqRCpYKqwqtCrsKyArNCuwhaWdSYWMAdQB0AGUAO4DTANNAAAFpeWwKcQpyAGMAO4DUANRAHmRiImxhYwBQYXIAAOA12BLdcgBhAHYAZQA7gNIA0kCAAWFlaQCHCooKjQpjAHIATGFnAGEAqWNjInJvbgCfY3AAZgAA4DXYRt3lI25DdXJseQABRFGeCqYKbyV1YmxlUXVvdGUAAKAcIHUib3RlAACgGCAAoFQqAAFjbLEKtQpyAADgNdiq3GEAcwBoADuA2ADYQGkAbAHACsUKZABlADuA1QDVQGUAcwAAoDcqbQBsADuA1gDWQGUAcgAAAUJQ0wrmCgABYXLXCtoKcgAAoD4gYQBjAAABZWvgCuIKAKDeI2UAdAAAoLQjYSVyZW50aGVzaXMAAKDcI4AEYWNmaGlsb3JzAP0KAwsFCwkLCwsMCxELIwtaC3IjdGlhbEQAAKACInkAH2RyAADgNdgT3WkApmOgY/Ujc01pbnVzsWAAAWlwFQsgC24AYwBhAHIAZQBwAGwAYQBuAOUACgVmAACgGSGAobsqZWlvACoLRQtJC+MiZWRlc4CheiJFU1QANAs5C0ALcSJ1YWwAAKCvKuwkYW50RXF1YWwAoHwiaSJsZGUAAKB+Im0AZQAAoDMgAAFkcE0LUQv1IWN0AKAPIm8jcnRpb24AYaA3ImwAAKAdIgABY2leC2ILcgAA4DXYq9yoYwACVWZvc2oLbwtzC3cLTwBUADuAIgAiQHIAAOA12BTdcABmAACgGiFjAHIAAOA12KzcAAZCRWFjZWZoaW9yc3WPC5MLlwupC7YL2AvbC90LhQyTDJoMowzhIXJyAKAQKUcAO4CuAK5AgAFjbnIAnQugC6ML9SF0ZVRhZwAAoOsncgB0oKAhbAAAoBYpgAFhZXkArwuyC7UL8iFvblhh5CFpbFZhIGR2oBwhZSJyc2UAAAFFVb8LzwsAAWxxwwvIC+UibWVudACgCyL1JGlsaWJyaXVtAKDLIXAmRXF1aWxpYnJpdW0AAKBvKXIAAKAcIW8AoWPnIWh0AARBQ0RGVFVWYewLCgwQDDIMNwxeDHwM9gIAAW5y8Av4C2clbGVCcmFja2V0AACg6SfyIW93AKGSIUJM/wsDDGEAcgAAoOUhZSRmdEFycm93AACgxCFlI2lsaW5nAACgCSNvAPUBFgwAAB4MYiVsZUJyYWNrZXQAAKDnJ24A1AEjDAAAKgxlJGVWZWN0b3IAAKBdKeUiY3RvckKgwiFhAHIAAKBVKWwib29yAACgCyMAAWVyOwxLDGUAAKGiIkFWQQxGDHIicm93AACgpiHlImN0b3IAoFspaSNhbmdsZQBCorMiVgwAAAAAWgxhAHIAAKDQKXEidWFsAACgtSJwAIABRFRWAGUMbAxzDO8kd25WZWN0b3IAoE8pZSRlVmVjdG9yAACgXCnlImN0b3JCoL4hYQByAACgVCnlImN0b3JCoMAhYQByAACgUykAAXB1iQyMDGYAAKAdIe4kZEltcGxpZXMAoHAp6SRnaHRhcnJvdwCg2yEAAWNongyhDHIAAKAbIQCgsSHsJGVEZWxheWVkAKD0KYAGSE9hY2ZoaW1vcXN0dQC/DMgMzAzQDOIM5gwKDQ0NFA0ZDU8NVA1YDQABQ2PDDMYMyCFjeSlkeQAoZEYiVGN5ACxkYyJ1dGUAWmEAorwqYWVpedgM2wzeDOEM8iFvbmBh5CFpbF5hcgBjAFxhIWRyAADgNdgW3e8hcnQAAkRMUlXvDPYM/QwEDW8kd25BcnJvdwAAoJMhZSRmdEFycm93AACgkCHpJGdodEFycm93AKCSIXAjQXJyb3cAAKCRIechbWGjY+EkbGxDaXJjbGUAoBgicABmAADgNdhK3XICHw0AAAAAIg10AACgGiLhIXJlgKGhJUlTVQAqDTINSg3uJXRlcnNlY3Rpb24AoJMidQAAAWJwNw1ADfMhZXRFoI8icSJ1YWwAAKCRIuUicnNldEWgkCJxInVhbAAAoJIibiJpb24AAKCUImMAcgAA4DXYrtxhAHIAAKDGIgACYmNtcF8Nag2ODZANc6DQImUAdABFoNAicSJ1YWwAAKCGIgABY2huDYkNZSJlZHMAgKF7IkVTVAB4DX0NhA1xInVhbAAAoLAq7CRhbnRFcXVhbACgfSJpImxkZQAAoH8iVABoAGEA9ADHCwCgESIAodEiZXOVDZ8NciJzZXQARaCDInEidWFsAACghyJlAHQAAKDRIoAFSFJTYWNmaGlvcnMAtQ27Db8NyA3ODdsN3w3+DRgOHQ4jDk8AUgBOADuA3gDeQMEhREUAoCIhAAFIY8MNxg1jAHkAC2R5ACZkAAFidcwNzQ0JYKRjgAFhZXkA1A3XDdoN8iFvbmRh5CFpbGJhImRyAADgNdgX3QABZWnjDe4N8gHoDQAA7Q3lImZvcmUAoDQiYQCYYwABY27yDfkNayNTcGFjZQAA4F8gCiDTInBhY2UAoAkg7CFkZYChPCJFRlQABw4MDhMOcSJ1YWwAAKBDInUkbGxFcXVhbAAAoEUiaSJsZGUAAKBIInAAZgAA4DXYS93pI3BsZURvdACg2yAAAWN0Jw4rDnIAAOA12K/c8iFva2Zh4QpFDlYOYA5qDgAAbg5yDgAAAAAAAAAAAAB5DnwOqA6zDgAADg8RDxYPGg8AAWNySA5ODnUAdABlADuA2gDaQHIAb6CfIeMhaXIAoEkpcgDjAVsOAABdDnkADmR2AGUAbGEAAWl5Yw5oDnIAYwA7gNsA20AjZGIibGFjAHBhcgAA4DXYGN1yAGEAdgBlADuA2QDZQOEhY3JqYQABZGl/Dp8OZQByAAABQlCFDpcOAAFhcokOiw5yAF9gYQBjAAABZWuRDpMOAKDfI2UAdAAAoLUjYSVyZW50aGVzaXMAAKDdI28AbgBQoMMi7CF1cwCgjiIAAWdwqw6uDm8AbgByYWYAAOA12EzdAARBREVUYWRwc78O0g7ZDuEOBQPqDvMOBw9yInJvdwDCoZEhyA4AAMwOYQByAACgEilvJHduQXJyb3cAAKDFIW8kd25BcnJvdwAAoJUhcSV1aWxpYnJpdW0AAKBuKWUAZQBBoKUiciJyb3cAAKClIW8AdwBuAGEAcgByAG8A9wAQA2UAcgAAAUxS+Q4AD2UkZnRBcnJvdwAAoJYh6SRnaHRBcnJvdwCglyFpAGyg0gNvAG4ApWPpIW5nbmFjAHIAAOA12LDcaSJsZGUAaGFtAGwAO4DcANxAgAREYmNkZWZvc3YALQ8xDzUPNw89D3IPdg97D4AP4SFzaACgqyJhAHIAAKDrKnkAEmThIXNobKCpIgCg5ioAAWVyQQ9DDwCgwSKAAWJ0eQBJD00Paw9hAHIAAKAWIGmgFiDjIWFsAAJCTFNUWA9cD18PZg9hAHIAAKAjIukhbmV8YGUkcGFyYXRvcgAAoFgnaSJsZGUAAKBAItQkaGluU3BhY2UAoAogcgAA4DXYGd1wAGYAAOA12E3dYwByAADgNdix3GQiYXNoAACgqiKAAmNlZm9zAI4PkQ+VD5kPng/pIXJjdGHkIWdlAKDAInIAAOA12BrdcABmAADgNdhO3WMAcgAA4DXYstwAAmZpb3OqD64Prw+0D3IAAOA12BvdnmNwAGYAAOA12E/dYwByAADgNdiz3IAEQUlVYWNmb3N1AMgPyw/OD9EP2A/gD+QP6Q/uD2MAeQAvZGMAeQAHZGMAeQAuZGMAdQB0AGUAO4DdAN1AAAFpedwP3w9yAGMAdmErZHIAAOA12BzdcABmAADgNdhQ3WMAcgAA4DXYtNxtAGwAeGEABEhhY2RlZm9z/g8BEAUQDRAQEB0QIBAkEGMAeQAWZGMidXRlAHlhAAFheQkQDBDyIW9ufWEXZG8AdAB7YfIBFRAAABwQbwBXAGkAZAB0AOgAVAhhAJZjcgAAoCghcABmAACgJCFjAHIAAOA12LXc4QtCEEkQTRAAAGcQbRByEAAAAAAAAAAAeRCKEJcQ8hD9EAAAGxEhETIROREAAD4RYwB1AHQAZQA7gOEA4UByImV2ZQADYYCiPiJFZGl1eQBWEFkQWxBgEGUQAOA+IjMDAKA/InIAYwA7gOIA4kB0AGUAO4C0ALRAMGRsAGkAZwA7gOYA5kByoGEgAOA12B7dcgBhAHYAZQA7gOAA4EAAAWVwfBCGEAABZnCAEIQQ8yF5bQCgNSHoAIMQaABhALFjAAFhcI0QWwAAAWNskRCTEHIAAWFnAACgPypkApwQAAAAALEQAKInImFkc3ajEKcQqRCuEG4AZAAAoFUqAKBcKmwib3BlAACgWCoAoFoqAKMgImVsbXJzersQvRDAEN0Q5RDtEACgpCllAACgICJzAGQAYaAhImEEzhDQENIQ1BDWENgQ2hDcEACgqCkAoKkpAKCqKQCgqykAoKwpAKCtKQCgrikAoK8pdAB2oB8iYgBkoL4iAKCdKQABcHTpEOwQaAAAoCIixWDhIXJyAKB8IwABZ3D1EPgQbwBuAAVhZgAA4DXYUt0Ao0giRWFlaW9wBxEJEQ0RDxESERQRAKBwKuMhaXIAoG8qAKBKImQAAKBLInMAJ2DyIW94ZaBIIvEADhFpAG4AZwA7gOUA5UCAAWN0eQAmESoRKxFyAADgNdi23CpgbQBwAGWgSCLxAPgBaQBsAGQAZQA7gOMA40BtAGwAO4DkAORAAAFjaUERRxFvAG4AaQBuAPQA6AFuAHQAAKARKgAITmFiY2RlZmlrbG5vcHJzdWQRaBGXEZ8RpxGrEdIR1hErEjASexKKEn0RThNbE3oTbwB0AACg7SoAAWNybBGJEWsAAAJjZXBzdBF4EX0RghHvIW5nAKBMInAjc2lsb24A9mNyImltZQAAoDUgaQBtAGWgPSJxAACgzSJ2AY0RkRFlAGUAAKC9ImUAZABnoAUjZQAAoAUjcgBrAHSgtSPiIXJrAKC2IwABb3mjEaYRbgDnAHcRMWTxIXVvAKAeIIACY21wcnQAtBG5Eb4RwRHFEeEhdXPloDUi5ABwInR5dgAAoLApcwDpAH0RbgBvAPUA6gCAAWFodwDLEcwRzhGyYwCgNiHlIWVuAKBsInIAAOA12B/dZwCAA2Nvc3R1dncA4xHyEQUSEhIhEiYSKRKAAWFpdQDpEesR7xHwAKMFcgBjAACg7yVwAACgwyKAAWRwdAD4EfwRABJvAHQAAKAAKuwhdXMAoAEqaSJtZXMAAKACKnECCxIAAAAADxLjIXVwAKAGKmEAcgAAoAUm8iNpYW5nbGUAAWR1GhIeEu8hd24AoL0lcAAAoLMlcCJsdXMAAKAEKmUA5QBCD+UAkg9hInJvdwAAoA0pgAFha28ANhJoEncSAAFjbjoSZRJrAIABbHN0AEESRxJNEm8jemVuZ2UAAKDrKXEAdQBhAHIA5QBcBPIjaWFuZ2xlgKG0JWRscgBYElwSYBLvIXduAKC+JeUhZnQAoMIlaSJnaHQAAKC4JWsAAKAjJLEBbRIAAHUSsgFxEgAAcxIAoJIlAKCRJTQAAKCTJWMAawAAoIglAAFlb38ShxJx4D0A5SD1IWl2AOBhIuUgdAAAoBAjAAJwdHd4kRKVEpsSnxJmAADgNdhT3XSgpSJvAG0AAKClIvQhaWUAoMgiAAZESFVWYmRobXB0dXayEsES0RLgEvcS+xIKExoTHxMjEygTNxMAAkxSbHK5ErsSvRK/EgCgVyUAoFQlAKBWJQCgUyUAolAlRFVkdckSyxLNEs8SAKBmJQCgaSUAoGQlAKBnJQACTFJsctgS2hLcEt4SAKBdJQCgWiUAoFwlAKBZJQCjUSVITFJobHLrEu0S7xLxEvMS9RIAoGwlAKBjJQCgYCUAoGslAKBiJQCgXyVvAHgAAKDJKQACTFJscgITBBMGEwgTAKBVJQCgUiUAoBAlAKAMJQCiACVEVWR1EhMUExYTGBMAoGUlAKBoJQCgLCUAoDQlaSJudXMAAKCfIuwhdXMAoJ4iaSJtZXMAAKCgIgACTFJsci8TMRMzEzUTAKBbJQCgWCUAoBglAKAUJQCjAiVITFJobHJCE0QTRhNIE0oTTBMAoGolAKBhJQCgXiUAoDwlAKAkJQCgHCUAAWV2UhNVE3YA5QD5AGIAYQByADuApgCmQAACY2Vpb2ITZhNqE24TcgAA4DXYt9xtAGkAAKBPIG0A5aA9IogRbAAAoVwAYmh0E3YTAKDFKfMhdWIAoMgnbAF+E4QTbABloCIgdAAAoCIgcAAAoU4iRWWJE4sTAKCuKvGgTyI8BeEMqRMAAN8TABQDFB8UAAAjFDQUAAAAAIUUAAAAAI0UAAAAANcU4xT3FPsUAACIFQAAlhWAAWNwcgCuE7ET1RP1IXRlB2GAoikiYWJjZHMAuxO/E8QTzhPSE24AZAAAoEQqciJjdXAAAKBJKgABYXXIE8sTcAAAoEsqcAAAoEcqbwB0AACgQCoA4CkiAP4AAWVv2RPcE3QAAKBBIO4ABAUAAmFlaXXlE+8T9RP4E/AB6hMAAO0TcwAAoE0qbwBuAA1hZABpAGwAO4DnAOdAcgBjAAlhcABzAHOgTCptAACgUCpvAHQAC2GAAWRtbgAIFA0UEhRpAGwAO4C4ALhAcCJ0eXYAAKCyKXQAAIGiADtlGBQZFKJAcgBkAG8A9ABiAXIAAOA12CDdgAFjZWkAKBQqFDIUeQBHZGMAawBtoBMn4SFyawCgEyfHY3IAAKPLJUVjZWZtcz8UQRRHFHcUfBSAFACgwykAocYCZWxGFEkUcQAAoFciZQBhAlAUAAAAAGAUciJyb3cAAAFsclYUWhTlIWZ0AKC6IWkiZ2h0AACguyGAAlJTYWNkAGgUaRRrFG8UcxSuYACgyCRzAHQAAKCbIukhcmMAoJoi4SFzaACgnSJuImludAAAoBAqaQBkAACg7yrjIWlyAKDCKfUhYnN1oGMmaQB0AACgYybsApMUmhS2FAAAwxRvAG4AZaA6APGgVCKrAG0CnxQAAAAAoxRhAHSgLABAYAChASJmbKcUqRTuABMNZQAAAW14rhSyFOUhbnQAoAEiZQDzANIB5wG6FAAAwBRkoEUibwB0AACgbSpuAPQAzAGAAWZyeQDIFMsUzhQA4DXYVN1vAOQA1wEAgakAO3MeAdMUcgAAoBchAAFhb9oU3hRyAHIAAKC1IXMAcwAAoBcnAAFjdeYU6hRyAADgNdi43AABYnDuFPIUZaDPKgCg0SploNAqAKDSKuQhb3QAoO8igANkZWxwcnZ3AAYVEBUbFSEVRBVlFYQV4SFycgABbHIMFQ4VAKA4KQCgNSlwAhYVAAAAABkVcgAAoN4iYwAAoN8i4SFycnCgtiEAoD0pgKIqImJjZG9zACsVMBU6FT4VQRVyImNhcAAAoEgqAAFhdTQVNxVwAACgRipwAACgSipvAHQAAKCNInIAAKBFKgDgKiIA/gACYWxydksVURVuFXMVcgByAG2gtyEAoDwpeQCAAWV2dwBYFWUVaRVxAHACXxUAAAAAYxVyAGUA4wAXFXUA4wAZFWUAZQAAoM4iZSJkZ2UAAKDPImUAbgA7gKQApEBlI2Fycm93AAABbHJ7FX8V5SFmdACgtiFpImdodAAAoLchZQDkAG0VAAFjaYsVkRVvAG4AaQBuAPQAkwFuAHQAAKAxImwiY3R5AACgLSOACUFIYWJjZGVmaGlqbG9yc3R1d3oAuBW7Fb8V1RXgFegV+RUKFhUWHxZUFlcWZRbFFtsW7xb7FgUXChdyAPIAtAJhAHIAAKBlKQACZ2xyc8YVyhXOFdAV5yFlcgCgICDlIXRoAKA4IfIA9QxoAHagECAAoKMiawHZFd4VYSJyb3cAAKAPKWEA4wBfAgABYXnkFecV8iFvbg9hNGQAoUYhYW/tFfQVAAFnciEC8RVyAACgyiF0InNlcQAAoHcqgAFnbG0A/xUCFgUWO4CwALBAdABhALRjcCJ0eXYAAKCxKQABaXIOFhIW8yFodACgfykA4DXYId1hAHIAAAFschsWHRYAoMMhAKDCIYACYWVnc3YAKBauAjYWOhY+Fm0AAKHEIm9zLhY0Fm4AZABzoMQi9SFpdACgZiZhIm1tYQDdY2kAbgAAoPIiAKH3AGlvQxZRFmQAZQAAgfcAO29KFksW90BuI3RpbWVzAACgxyJuAPgAUBZjAHkAUmRjAG8CXhYAAAAAYhZyAG4AAKAeI28AcAAAoA0jgAJscHR1dwBuFnEWdRaSFp4W7CFhciRgZgAA4DXYVd0AotkCZW1wc30WhBaJFo0WcQBkoFAibwB0AACgUSJpIm51cwAAoDgi7CF1cwCgFCLxInVhcmUAoKEiYgBsAGUAYgBhAHIAdwBlAGQAZwDlANcAbgCAAWFkaAClFqoWtBZyAHIAbwD3APUMbwB3AG4AYQByAHIAbwB3APMA8xVhI3Jwb29uAAABbHK8FsAWZQBmAPQAHBZpAGcAaAD0AB4WYgHJFs8WawBhAHIAbwD3AJILbwLUFgAAAADYFnIAbgAAoB8jbwBwAACgDCOAAWNvdADhFukW7BYAAXJ55RboFgDgNdi53FVkbAAAoPYp8iFvaxFhAAFkcvMW9xZvAHQAAKDxImkA5qC/JVsSAAFhaP8WAhdyAPIANQNhAPIA1wvhIm5nbGUAoKYpAAFjaQ4XEBd5AF9k5yJyYXJyAKD/JwAJRGFjZGVmZ2xtbm9wcXJzdHV4MRc4F0YXWxcyBF4XaRd5F40XrBe0F78X2RcVGCEYLRg1GEAYAAFEbzUXgRZvAPQA+BUAAWNzPBdCF3UAdABlADuA6QDpQPQhZXIAoG4qAAJhaW95TRdQF1YXWhfyIW9uG2FyAGOgViI7gOoA6kDsIW9uAKBVIk1kbwB0ABdhAAFEcmIXZhdvAHQAAKBSIgDgNdgi3XKhmipuF3QXYQB2AGUAO4DoAOhAZKCWKm8AdAAAoJgqgKGZKmlscwCAF4UXhxfuInRlcnMAoOcjAKATIWSglSpvAHQAAKCXKoABYXBzAJMXlheiF2MAcgATYXQAeQBzogUinxcAAAAAoRdlAHQAAKAFInAAMaADIDMBqRerFwCgBCAAoAUgAAFnc7AXsRdLYXAAAKACIAABZ3C4F7sXbwBuABlhZgAA4DXYVt2AAWFscwDFF8sXzxdyAHOg1SJsAACg4yl1AHMAAKBxKmkAAKG1A2x21RfYF28AbgC1Y/VjAAJjc3V24BfoF/0XEBgAAWlv5BdWF3IAYwAAoFYiaQLuFwAAAADwF+0ADQThIW50AAFnbPUX+Rd0AHIAAKCWKuUhc3MAoJUqgAFhZWkAAxgGGAoYbABzAD1gcwB0AACgXyJ2AESgYSJEAACgeCrwImFyc2wAoOUpAAFEYRkYHRhvAHQAAKBTInIAcgAAoHEpgAFjZGkAJxgqGO0XcgAAoC8hbwD0AIwCAAFhaDEYMhi3YzuA8ADwQAABbXI5GD0YbAA7gOsA60BvAACgrCCAAWNpcABGGEgYSxhsACFgcwD0ACwEAAFlb08YVxhjAHQAYQB0AGkAbwDuABoEbgBlAG4AdABpAGEAbADlADME4Ql1GAAAgRgAAIMYiBgAAAAAoRilGAAAqhgAALsYvhjRGAAA1xgnGWwAbABpAG4AZwBkAG8AdABzAGUA8QBlF3kARGRtImFsZQAAoEAmgAFpbHIAjRiRGJ0Y7CFpZwCgA/tpApcYAAAAAJoYZwAAoAD7aQBnAACgBPsA4DXYI93sIWlnAKAB++whaWcA4GYAagCAAWFsdACvGLIYthh0AACgbSZpAGcAAKAC+24AcwAAoLElbwBmAJJh8AHCGAAAxhhmAADgNdhX3QABYWvJGMwYbADsAGsEdqDUIgCg2SphI3J0aW50AACgDSoAAWFv2hgiGQABY3PeGB8ZsQPnGP0YBRkSGRUZAAAdGbID7xjyGPQY9xj5GAAA+xg7gL0AvUAAoFMhO4C8ALxAAKBVIQCgWSEAoFshswEBGQAAAxkAoFQhAKBWIbQCCxkOGQAAAAAQGTuAvgC+QACgVyEAoFwhNQAAoFghtgEZGQAAGxkAoFohAKBdITgAAKBeIWwAAKBEIHcAbgAAoCIjYwByAADgNdi73IAIRWFiY2RlZmdpamxub3JzdHYARhlKGVoZXhlmGWkZkhmWGZkZnRmgGa0ZxhnLGc8Z4BkjGmygZyIAoIwqgAFjbXAAUBlTGVgZ9SF0ZfVhbQBhAOSgswM6FgCghipyImV2ZQAfYQABaXliGWUZcgBjAB1hM2RvAHQAIWGAoWUibHFzAMYEcBl6GfGhZSLOBAAAdhlsAGEAbgD0AN8EgKF+KmNkbACBGYQZjBljAACgqSpvAHQAb6CAKmyggioAoIQqZeDbIgD+cwAAoJQqcgAA4DXYJN3noGsirATtIWVsAKA3IWMAeQBTZIChdyJFYWoApxmpGasZAKCSKgCgpSoAoKQqAAJFYWVztBm2Gb0ZwhkAoGkicABwoIoq8iFveACgiipxoIgq8aCIKrUZaQBtAACg5yJwAGYAAOA12FjdYQB2AOUAYwIAAWNp0xnWGXIAAKAKIW0AAKFzImVs3BneGQCgjioAoJAqAIM+ADtjZGxxco0E6xn0GfgZ/BkBGgABY2nvGfEZAKCnKnIAAKB6Km8AdAAAoNci0CFhcgCglSl1ImVzdAAAoHwqgAJhZGVscwAKGvQZFhrVBCAa8AEPGgAAFBpwAHIAbwD4AFkZcgAAoHgpcQAAAWxxxAQbGmwAZQBzAPMASRlpAO0A5AQAAWVuJxouGnIjdG5lcXEAAOBpIgD+xQAsGgAFQWFiY2Vma29zeUAaQxpmGmoabRqDGocalhrCGtMacgDyAMwCAAJpbG1yShpOGlAaVBpyAHMA8ABxD2YAvWBpAGwA9AASBQABZHJYGlsaYwB5AEpkAKGUIWN3YBpkGmkAcgAAoEgpAKCtIWEAcgAAoA8h6SFyYyVhgAFhbHIAcxp7Gn8a8iF0c3WgZSZpAHQAAKBlJuwhaXAAoCYg4yFvbgCguSJyAADgNdgl3XMAAAFld4wakRphInJvdwAAoCUpYSJyb3cAAKAmKYACYW1vcHIAnxqjGqcauhq+GnIAcgAAoP8h9CFodACgOyJrAAABbHKsGrMaZSRmdGFycm93AACgqSHpJGdodGFycm93AKCqIWYAAOA12Fnd4iFhcgCgFSCAAWNsdADIGswa0BpyAADgNdi93GEAcwDoAGka8iFvaydhAAFicNca2xr1IWxsAKBDIOghZW4AoBAg4Qr2GgAA/RoAAAgbExsaGwAAIRs7GwAAAAA+G2IbmRuVG6sbAACyG80b0htjAHUAdABlADuA7QDtQAChYyBpeQEbBhtyAGMAO4DuAO5AOGQAAWN4CxsNG3kANWRjAGwAO4ChAKFAAAFmcssCFhsA4DXYJt1yAGEAdgBlADuA7ADsQIChSCFpbm8AJxsyGzYbAAFpbisbLxtuAHQAAKAMKnQAAKAtIuYhaW4AoNwpdABhAACgKSHsIWlnM2GAAWFvcABDG1sbXhuAAWNndABJG0sbWRtyACthgAFlbHAAcQVRG1UbaQBuAOUAyAVhAHIA9AByBWgAMWFmAACgtyJlAGQAtWEAoggiY2ZvdGkbbRt1G3kb4SFyZQCgBSFpAG4AdKAeImkAZQAAoN0pZABvAPQAWxsAoisiY2VscIEbhRuPG5QbYQBsAACguiIAAWdyiRuNG2UAcgDzACMQ4wCCG2EicmhrAACgFyryIW9kAKA8KgACY2dwdJ8boRukG6gbeQBRZG8AbgAvYWYAAOA12FrdYQC5Y3UAZQBzAHQAO4C/AL9AAAFjabUbuRtyAADgNdi+3G4AAKIIIkVkc3bCG8QbyBvQAwCg+SJvAHQAAKD1Inag9CIAoPMiaaBiIOwhZGUpYesB1hsAANkbYwB5AFZkbAA7gO8A70AAA2NmbW9zdeYb7hvyG/Ub+hsFHAABaXnqG+0bcgBjADVhOWRyAADgNdgn3eEhdGg3YnAAZgAA4DXYW93jAf8bAAADHHIAAOA12L/c8iFjeVhk6yFjeVRkAARhY2ZnaGpvcxUcGhwiHCYcKhwtHDAcNRzwIXBhdqC6A/BjAAFleR4cIRzkIWlsN2E6ZHIAAOA12CjdciJlZW4AOGFjAHkARWRjAHkAXGRwAGYAAOA12FzdYwByAADgNdjA3IALQUJFSGFiY2RlZmdoamxtbm9wcnN0dXYAXhxtHHEcdRx5HN8cBx0dHTwd3B3tHfEdAR4EHh0eLB5FHrwewx7hHgkfPR9LH4ABYXJ0AGQcZxxpHHIA8gBvB/IAxQLhIWlsAKAbKeEhcnIAoA4pZ6BmIgCgiyphAHIAAKBiKWMJjRwAAJAcAACVHAAAAAAAAAAAAACZHJwcAACmHKgcrRwAANIc9SF0ZTph7SJwdHl2AKC0KXIAYQDuAFoG4iFkYbtjZwAAoegnZGyhHKMcAKCRKeUAiwYAoIUqdQBvADuAqwCrQHIAgKOQIWJmaGxwc3QAuhy/HMIcxBzHHMoczhxmoOQhcwAAoB8pcwAAoB0p6wCyGnAAAKCrIWwAAKA5KWkAbQAAoHMpbAAAoKIhAKGrKmFl1hzaHGkAbAAAoBkpc6CtKgDgrSoA/oABYWJyAOUc6RztHHIAcgAAoAwpcgBrAACgcicAAWFr8Rz4HGMAAAFla/Yc9xx7YFtgAAFlc/wc/hwAoIspbAAAAWR1Ax0FHQCgjykAoI0pAAJhZXV5Dh0RHRodHB3yIW9uPmEAAWRpFR0YHWkAbAA8YewAowbiAPccO2QAAmNxcnMkHScdLB05HWEAAKA2KXUAbwDyoBwgqhEAAWR1MB00HeghYXIAoGcpcyJoYXIAAKBLKWgAAKCyIQCiZCJmZ3FzRB1FB5Qdnh10AIACYWhscnQATh1WHWUdbB2NHXIicm93AHSgkCFhAOkAzxxhI3Jwb29uAAABZHVeHWId7yF3bgCgvSFwAACgvCHlJGZ0YXJyb3dzAKDHIWkiZ2h0AIABYWhzAHUdex2DHXIicm93APOglCGdBmEAcgBwAG8AbwBuAPMAzgtxAHUAaQBnAGEAcgByAG8A9wBlGugkcmVldGltZXMAoMsi8aFkIk0HAACaHWwAYQBuAPQAXgcAon0qY2Rnc6YdqR2xHbcdYwAAoKgqbwB0AG+gfypyoIEqAKCDKmXg2iIA/nMAAKCTKoACYWRlZ3MAwB3GHcod1h3ZHXAAcAByAG8A+ACmHG8AdAAAoNYicQAAAWdxzx3SHXQA8gBGB2cAdADyAHQcdADyAFMHaQDtAGMHgAFpbHIA4h3mHeod8yFodACgfClvAG8A8gDKBgDgNdgp3UWgdiIAoJEqYQH1Hf4dcgAAAWR1YB35HWygvCEAoGopbABrAACghCVjAHkAWWQAomoiYWNodAweDx4VHhkecgDyAGsdbwByAG4AZQDyAGAW4SFyZACgaylyAGkAAKD6JQABaW8hHiQe5CFvdEBh9SFzdGGgsCPjIWhlAKCwIwACRWFlczMeNR48HkEeAKBoInAAcKCJKvIhb3gAoIkqcaCHKvGghyo0HmkAbQAAoOYiAARhYm5vcHR3elIeXB5fHoUelh6mHqsetB4AAW5yVh5ZHmcAAKDsJ3IAAKD9IXIA6wCwBmcAgAFsbXIAZh52Hnse5SFmdAABYXKIB2weaQBnAGgAdABhAHIAcgBvAPcAkwfhInBzdG8AoPwnaQBnAGgAdABhAHIAcgBvAPcAmgdwI2Fycm93AAABbHKNHpEeZQBmAPQAxhxpImdodAAAoKwhgAFhZmwAnB6fHqIecgAAoIUpAOA12F3ddQBzAACgLSppIm1lcwAAoDQqYQGvHrMecwB0AACgFyLhAIoOZaHKJbkeRhLuIWdlAKDKJWEAcgBsoCgAdAAAoJMpgAJhY2htdADMHs8e1R7bHt0ecgDyAJ0GbwByAG4AZQDyANYWYQByAGSgyyEAoG0pAKAOIHIAaQAAoL8iAANhY2hpcXTrHu8e1QfzHv0eBh/xIXVvAKA5IHIAAOA12MHcbQDloXIi+h4AAPweAKCNKgCgjyoAAWJ19xwBH28AcqAYIACgGiDyIW9rQmEAhDwAO2NkaGlscXJCBhcfxh0gHyQfKB8sHzEfAAFjaRsfHR8AoKYqcgAAoHkqcgBlAOUAkx3tIWVzAKDJIuEhcnIAoHYpdSJlc3QAAKB7KgABUGk1HzkfYQByAACglillocMlAgdfEnIAAAFkdUIfRx9zImhhcgAAoEop6CFhcgCgZikAAWVuTx9WH3IjdG5lcXEAAOBoIgD+xQBUHwAHRGFjZGVmaGlsbm9wc3VuH3Ifoh+rH68ftx+7H74f5h/uH/MfBwj/HwsgxCFvdACgOiIAAmNscHJ5H30fiR+eH3IAO4CvAK9AAAFldIEfgx8AoEImZaAgJ3MAZQAAoCAnc6CmIXQAbwCAoaYhZGx1AJQfmB+cH28AdwDuAHkDZQBmAPQA6gbwAOkO6yFlcgCgriUAAW95ph+qH+0hbWEAoCkqPGThIXNoAKAUIOElc3VyZWRhbmdsZQCgISJyAADgNdgq3W8AAKAnIYABY2RuAMQfyR/bH3IAbwA7gLUAtUBhoiMi0B8AANMf1x9zAPQAKxFpAHIAAKDwKm8AdAA7gLcAt0B1AHMA4qESIh4TAADjH3WgOCIAoCoqYwHqH+0fcAAAoNsq8gB+GnAAbAB1APMACAgAAWRw9x/7H+UhbHMAoKciZgAA4DXYXt0AAWN0AyAHIHIAAOA12MLc8CFvcwCgPiJsobwDECAVIPQiaW1hcACguCJhAPAAEyAADEdMUlZhYmNkZWZnaGlqbG1vcHJzdHV2dzwgRyBmIG0geSCqILgg2iDeIBEhFSEyIUMhTSFQIZwhnyHSIQAiIyKLIrEivyIUIwABZ3RAIEMgAODZIjgD9uBrItIgBwmAAWVsdABNIF8gYiBmAHQAAAFhclMgWCByInJvdwAAoM0h6SRnaHRhcnJvdwCgziEA4NgiOAP24Goi0iBfCekkZ2h0YXJyb3cAoM8hAAFEZHEgdSDhIXNoAKCvIuEhc2gAoK4igAJiY25wdACCIIYgiSCNIKIgbABhAACgByL1IXRlRGFnAADgICLSIACiSSJFaW9wlSCYIJwgniAA4HAqOANkAADgSyI4A3MASWFyAG8A+AAyCnUAcgBhoG4mbADzoG4mmwjzAa8gAACzIHAAO4CgAKBAbQBwAOXgTiI4AyoJgAJhZW91eQDBIMogzSDWINkg8AHGIAAAyCAAoEMqbwBuAEhh5CFpbEZhbgBnAGSgRyJvAHQAAOBtKjgDcAAAoEIqPWThIXNoAKATIACjYCJBYWRxc3jpIO0g+SD+IAIhDCFyAHIAAKDXIXIAAAFocvIg9SBrAACgJClvoJch9wAGD28AdAAA4FAiOAN1AGkA9gC7CAABZWkGIQohYQByAACgKCntAN8I6SFzdPOgBCLlCHIAAOA12CvdAAJFZXN0/wgcISshLiHxoXEiIiEAABMJ8aFxIgAJAAAnIWwAYQBuAPQAEwlpAO0AGQlyoG8iAKBvIoABQWFwADghOyE/IXIA8gBeIHIAcgAAoK4hYQByAACg8ipzogsiSiEAAAAAxwtkoPwiAKD6ImMAeQBaZIADQUVhZGVzdABcIV8hYiFmIWkhkyGWIXIA8gBXIADgZiI4A3IAcgAAoJohcgAAoCUggKFwImZxcwBwIYQhjiF0AAABYXJ1IXohcgByAG8A9wBlIWkAZwBoAHQAYQByAHIAbwD3AD4h8aFwImAhAACKIWwAYQBuAPQAZwlz4H0qOAMAoG4iaQDtAG0JcqBuImkA5aDqIkUJaQDkADoKAAFwdKMhpyFmAADgNdhf3YCBrAA7aW4AriGvIcchrEBuAIChCSJFZHYAtyG6Ib8hAOD5IjgDbwB0AADg9SI4A+EB1gjEIcYhAKD3IgCg9iJpAHagDCLhAagJzyHRIQCg/iIAoP0igAFhb3IA2CHsIfEhcgCAoSYiYXN0AOAh5SHpIWwAbABlAOwAywhsAADg/SrlIADgAiI4A2wiaW50AACgFCrjoYAi9yEAAPohdQDlAJsJY+CvKjgDZaCAIvEAkwkAAkFhaXQHIgoiFyIeInIA8gBsIHIAcgAAoZshY3cRIhQiAOAzKTgDAOCdITgDZyRodGFycm93AACgmyFyAGkA5aDrIr4JgANjaGltcHF1AC8iPCJHIpwhTSJQIloigKGBImNlcgA2Iv0JOSJ1AOUABgoA4DXYw9zvIXJ0bQKdIQAAAABEImEAcgDhAOEhbQBloEEi8aBEIiYKYQDyAMsIcwB1AAABYnBWIlgi5QDUCeUA3wmAAWJjcABgInMieCKAoYQiRWVzAGci7glqIgDgxSo4A2UAdABl4IIi0iBxAPGgiCJoImMAZaCBIvEA/gmAoYUiRWVzAH8iFgqCIgDgxio4A2UAdABl4IMi0iBxAPGgiSKAIgACZ2lscpIilCKaIpwi7AAMCWwAZABlADuA8QDxQOcAWwlpI2FuZ2xlAAABbHKkIqoi5SFmdGWg6iLxAEUJaSJnaHQAZaDrIvEAvgltoL0DAKEjAGVzuCK8InIAbwAAoBYhcAAAoAcggARESGFkZ2lscnMAziLSItYi2iLeIugi7SICIw8j4SFzaACgrSLhIXJyAKAEKXAAAOBNItIg4SFzaACgrCIAAWV04iLlIgDgZSLSIADgPgDSIG4iZmluAACg3imAAUFldADzIvci+iJyAHIAAKACKQDgZCLSIHLgPADSIGkAZQAA4LQi0iAAAUF0BiMKI3IAcgAAoAMp8iFpZQDgtSLSIGkAbQAA4Dwi0iCAAUFhbgAaIx4jKiNyAHIAAKDWIXIAAAFociMjJiNrAACgIylvoJYh9wD/DuUhYXIAoCcpUxJqFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVCMAAF4jaSN/I4IjjSOeI8AUAAAAAKYjwCMAANoj3yMAAO8jHiQvJD8kRCQAAWNzVyNsFHUAdABlADuA8wDzQAABaXlhI2cjcgBjoJoiO4D0APRAPmSAAmFiaW9zAHEjdCN3I3EBeiNzAOgAdhTsIWFjUWF2AACgOCrvIWxkAKC8KewhaWdTYQABY3KFI4kjaQByAACgvykA4DXYLN1vA5QjAAAAAJYjAACcI24A22JhAHYAZQA7gPIA8kAAoMEpAAFibaEjjAphAHIAAKC1KQACYWNpdKwjryO6I70jcgDyAFkUAAFpcrMjtiNyAACgvinvIXNzAKC7KW4A5QDZCgCgwCmAAWFlaQDFI8gjyyNjAHIATWFnAGEAyWOAAWNkbgDRI9Qj1iPyIW9uv2MAoLYpdQDzAHgBcABmAADgNdhg3YABYWVsAOQj5yPrI3IAAKC3KXIAcAAAoLkpdQDzAHwBAKMoImFkaW9zdvkj/CMPJBMkFiQbJHIA8gBeFIChXSplZm0AAyQJJAwkcgBvoDQhZgAAoDQhO4CqAKpAO4C6ALpA5yFvZgCgtiJyAACgVipsIm9wZQAAoFcqAKBbKoABY2xvACMkJSQrJPIACCRhAHMAaAA7gPgA+EBsAACgmCJpAGwBMyQ4JGQAZQA7gPUA9UBlAHMAYaCXInMAAKA2Km0AbAA7gPYA9kDiIWFyAKA9I+EKXiQAAHokAAB8JJQkAACYJKkkAAAAALUkEQsAAPAkAAAAAAQleiUAAIMlcgCAoSUiYXN0AGUkbyQBCwCBtgA7bGokayS2QGwAZQDsABgDaQJ1JAAAAAB4JG0AAKDzKgCg/Sp5AD9kcgCAAmNpbXB0AIUkiCSLJJkSjyRuAHQAJWBvAGQALmBpAGwAAKAwIOUhbmsAoDEgcgAA4DXYLd2AAWltbwCdJKAkpCR2oMYD1WNtAGEA9AD+B24AZQAAoA4m9KHAA64kAAC0JGMjaGZvcmsAAKDUItZjAAFhdbgkxCRuAAABY2u9JMIkawBooA8hAKAOIfYAaRpzAACkKwBhYmNkZW1zdNMkIRPXJNsk4STjJOck6yTjIWlyAKAjKmkAcgAAoCIqAAFvdYsW3yQAoCUqAKByKm4AO4CxALFAaQBtAACgJip3AG8AAKAnKoABaXB1APUk+iT+JO4idGludACgFSpmAADgNdhh3W4AZAA7gKMAo0CApHoiRWFjZWlub3N1ABMlFSUYJRslTCVRJVklSSV1JQCgsypwAACgtyp1AOUAPwtjoK8qgKJ6ImFjZW5zACclLSU0JTYlSSVwAHAAcgBvAPgAFyV1AHIAbAB5AGUA8QA/C/EAOAuAAWFlcwA8JUElRSXwInByb3gAoLkqcQBxAACgtSppAG0AAKDoImkA7QBEC20AZQDzoDIgIguAAUVhcwBDJVclRSXwAEAlgAFkZnAATwtfJXElgAFhbHMAZSVpJW0l7CFhcgCgLiPpIW5lAKASI/UhcmYAoBMjdKAdIu8AWQvyIWVsAKCwIgABY2l9JYElcgAA4DXYxdzIY24iY3NwAACgCCAAA2Zpb3BzdZElKxuVJZolnyWkJXIAAOA12C7dcABmAADgNdhi3XIiaW1lAACgVyBjAHIAAOA12MbcgAFhZW8AqiW6JcAldAAAAWVpryW2JXIAbgBpAG8AbgDzABkFbgB0AACgFipzAHQAZaA/APEACRj0AG0LgApBQkhhYmNkZWZoaWxtbm9wcnN0dXgA4yXyJfYl+iVpJpAmpia9JtUm5ib4JlonaCdxJ3UnnietJ7EnyCfiJ+cngAFhcnQA6SXsJe4lcgDyAJkM8gD6AuEhaWwAoBwpYQByAPIA3BVhAHIAAKBkKYADY2RlbnFydAAGJhAmEyYYJiYmKyZaJgABZXUKJg0mAOA9IjEDdABlAFVhaQDjACAN7SJwdHl2AKCzKWcAgKHpJ2RlbAAgJiImJCYAoJIpAKClKeUA9wt1AG8AO4C7ALtAcgAApZIhYWJjZmhscHN0dz0mQCZFJkcmSiZMJk4mUSZVJlgmcAAAoHUpZqDlIXMAAKAgKQCgMylzAACgHinrALka8ACVHmwAAKBFKWkAbQAAoHQpbAAAoKMhAKCdIQABYWleJmImaQBsAACgGilvAG6gNiJhAGwA8wB2C4ABYWJyAG8mciZ2JnIA8gAvEnIAawAAoHMnAAFha3omgSZjAAABZWt/JoAmfWBdYAABZXOFJocmAKCMKWwAAAFkdYwmjiYAoI4pAKCQKQACYWV1eZcmmiajJqUm8iFvbllhAAFkaZ4moSZpAGwAV2HsAA8M4gCAJkBkAAJjbHFzrSawJrUmuiZhAACgNylkImhhcgAAoGkpdQBvAPKgHSCjAWgAAKCzIYABYWNnAMMm0iaUC2wAgKEcIWlwcwDLJs4migxuAOUAoAxhAHIA9ADaC3QAAKCtJYABaWxyANsm3ybjJvMhaHQAoH0pbwBvAPIANgwA4DXYL90AAWFv6ib1JnIAAAFkde8m8SYAoMEhbKDAIQCgbCl2oMED8WOAAWducwD+Jk4nUCdoAHQAAANhaGxyc3QKJxInISc1Jz0nRydyInJvdwB0oJIhYQDpAFYmYSNycG9vbgAAAWR1GiceJ28AdwDuAPAmcAAAoMAh5SFmdAABYWgnJy0ncgByAG8AdwDzAAkMYQByAHAAbwBvAG4A8wATBGklZ2h0YXJyb3dzAACgySFxAHUAaQBnAGEAcgByAG8A9wBZJugkcmVldGltZXMAoMwiZwDaYmkAbgBnAGQAbwB0AHMAZQDxABwYgAFhaG0AYCdjJ2YncgDyAAkMYQDyABMEAKAPIG8idXN0AGGgsSPjIWhlAKCxI+0haWQAoO4qAAJhYnB0fCeGJ4knmScAAW5ygCeDJ2cAAKDtJ3IAAKD+IXIA6wAcDIABYWZsAI8nkieVJ3IAAKCGKQDgNdhj3XUAcwAAoC4qaSJtZXMAAKA1KgABYXCiJ6gncgBnoCkAdAAAoJQp7yJsaW50AKASKmEAcgDyADwnAAJhY2hxuCe8J6EMwCfxIXVvAKA6IHIAAOA12MfcAAFidYAmxCdvAPKgGSCoAYABaGlyAM4n0ifWJ3IAZQDlAE0n7SFlcwCgyiJpAIChuSVlZmwAXAxjEt4n9CFyaQCgzinsInVoYXIAoGgpAKAeIWENBSgJKA0oSyhVKIYoAACLKLAoAAAAAOMo5ygAABApJCkxKW0pcSmHKaYpAACYKgAAAACxKmMidXRlAFthcQB1AO8ABR+ApHsiRWFjZWlucHN5ABwoHignKCooLygyKEEoRihJKACgtCrwASMoAAAlKACguCpvAG4AYWF1AOUAgw1koLAqaQBsAF9hcgBjAF1hgAFFYXMAOCg6KD0oAKC2KnAAAKC6KmkAbQAAoOki7yJsaW50AKATKmkA7QCIDUFkbwB0AGKixSKRFgAAAABTKACgZiqAA0FhY21zdHgAYChkKG8ocyh1KHkogihyAHIAAKDYIXIAAAFocmkoayjrAJAab6CYIfcAzAd0ADuApwCnQGkAO2D3IWFyAKApKW0AAAFpbn4ozQBuAHUA8wDOAHQAAKA2J3IA7+A12DDdIxkAAmFjb3mRKJUonSisKHIAcAAAoG8mAAFoeZkonChjAHkASWRIZHIAdABtAqUoAAAAAKgoaQDkAFsPYQByAGEA7ABsJDuArQCtQAABZ22zKLsobQBhAAChwwNmdroouijCY4CjPCJkZWdsbnByAMgozCjPKNMo1yjaKN4obwB0AACgairxoEMiCw5FoJ4qAKCgKkWgnSoAoJ8qZQAAoEYi7CF1cwCgJCrhIXJyAKByKWEAcgDyAPwMAAJhZWl07Sj8KAEpCCkAAWxz8Sj4KGwAcwBlAHQAbQDpAH8oaABwAACgMyrwImFyc2wAoOQpAAFkbFoPBSllAACgIyNloKoqc6CsKgDgrCoA/oABZmxwABUpGCkfKfQhY3lMZGKgLwBhoMQpcgAAoD8jZgAA4DXYZN1hAAABZHIoKRcDZQBzAHWgYCZpAHQAAKBgJoABY3N1ADYpRilhKQABYXU6KUApcABzoJMiAOCTIgD+cABzoJQiAOCUIgD+dQAAAWJwSylWKQChjyJlcz4NUCllAHQAZaCPIvEAPw0AoZAiZXNIDVspZQB0AGWgkCLxAEkNAKGhJWFmZilbBHIAZQFrKVwEAKChJWEAcgDyAAMNAAJjZW10dyl7KX8pgilyAADgNdjI3HQAbQDuAM4AaQDsAAYpYQByAOYAVw0AAWFyiimOKXIA5qAGJhESAAFhbpIpoylpImdodAAAAWVwmSmgKXAAcwBpAGwAbwDuANkXaADpAKAkcwCvYIACYmNtbnAArin8KY4NJSooKgCkgiJFZGVtbnByc7wpvinCKcgpzCnUKdgp3CkAoMUqbwB0AACgvSpkoIYibwB0AACgwyr1IWx0AKDBKgABRWXQKdIpAKDLKgCgiiLsIXVzAKC/KuEhcnIAoHkpgAFlaXUA4inxKfQpdAAAoYIiZW7oKewpcQDxoIYivSllAHEA8aCKItEpbQAAoMcqAAFicPgp+ikAoNUqAKDTKmMAgKJ7ImFjZW5zAAcqDSoUKhYqRihwAHAAcgBvAPgAIyh1AHIAbAB5AGUA8QCDDfEAfA2AAWFlcwAcKiIqPShwAHAAcgBvAPgAPChxAPEAOShnAACgaiYApoMiMTIzRWRlaGxtbnBzPCo/KkIqRSpHKlIqWCpjKmcqaypzKncqO4C5ALlAO4CyALJAO4CzALNAAKDGKgABb3NLKk4qdAAAoL4qdQBiAACg2CpkoIcibwB0AACgxCpzAAABb3VdKmAqbAAAoMknYgAAoNcq4SFycgCgeyn1IWx0AKDCKgABRWVvKnEqAKDMKgCgiyLsIXVzAKDAKoABZWl1AH0qjCqPKnQAAKGDImVugyqHKnEA8aCHIkYqZQBxAPGgiyJwKm0AAKDIKgABYnCTKpUqAKDUKgCg1iqAAUFhbgCdKqEqrCpyAHIAAKDZIXIAAAFocqYqqCrrAJUab6CZIfcAxQf3IWFyAKAqKWwAaQBnADuA3wDfQOELzyrZKtwq6SrsKvEqAAD1KjQrAAAAAAAAAAAAAEwrbCsAAHErvSsAAAAAAADRK3IC1CoAAAAA2CrnIWV0AKAWI8RjcgDrAOUKgAFhZXkA4SrkKucq8iFvbmVh5CFpbGNhQmRvAPQAIg5sInJlYwAAoBUjcgAA4DXYMd0AAmVpa2/7KhIrKCsuK/IBACsAAAkrZQAAATRm6g0EK28AcgDlAOsNYQBzorgDECsAAAAAEit5AG0A0WMAAWNuFislK2sAAAFhcxsrIStwAHAAcgBvAPgAFw5pAG0AAKA8InMA8AD9DQABYXMsKyEr8AAXDnIAbgA7gP4A/kDsATgrOyswG2QA5QBnAmUAcwCAgdcAO2JkAEMrRCtJK9dAYaCgInIAAKAxKgCgMCqAAWVwcwBRK1MraSvhAAkh4qKkIlsrXysAAAAAYytvAHQAAKA2I2kAcgAAoPEqb+A12GXdcgBrAACg2irhAHgociJpbWUAAKA0IIABYWlwAHYreSu3K2QA5QC+DYADYWRlbXBzdACFK6MrmiunK6wrsCuzK24iZ2xlAACitSVkbHFykCuUK5ornCvvIXduAKC/JeUhZnRloMMl8QACBwCgXCJpImdodABloLkl8QBdDG8AdAAAoOwlaSJudXMAAKA6KuwhdXMAoDkqYgAAoM0p6SFtZQCgOyrlInppdW0AoOIjgAFjaHQAwivKK80rAAFyecYrySsA4DXYydxGZGMAeQBbZPIhb2tnYQABaW/UK9creAD0ANERaCJlYWQAAAFsct4r5ytlAGYAdABhAHIAcgBvAPcAXQbpJGdodGFycm93AKCgIQAJQUhhYmNkZmdobG1vcHJzdHV3CiwNLBEsHSwnLDEsQCxLLFIsYix6LIQsjyzLLOgs7Sz/LAotcgDyAAkDYQByAACgYykAAWNyFSwbLHUAdABlADuA+gD6QPIACQ1yAOMBIywAACUseQBeZHYAZQBtYQABaXkrLDAscgBjADuA+wD7QENkgAFhYmgANyw6LD0scgDyANEO7CFhY3FhYQDyAOAOAAFpckQsSCzzIWh0AKB+KQDgNdgy3XIAYQB2AGUAO4D5APlAYQFWLF8scgAAAWxyWixcLACgvyEAoL4hbABrAACggCUAAWN0Zix2LG8CbCwAAAAAcyxyAG4AZaAcI3IAAKAcI28AcAAAoA8jcgBpAACg+CUAAWFsfiyBLGMAcgBrYTuAqACoQAABZ3CILIssbwBuAHNhZgAA4DXYZt0AA2FkaGxzdZksniynLLgsuyzFLHIAcgBvAPcACQ1vAHcAbgBhAHIAcgBvAPcA2A5hI3Jwb29uAAABbHKvLLMsZQBmAPQAWyxpAGcAaAD0AF0sdQDzAKYOaQAAocUDaGzBLMIs0mNvAG4AxWPwI2Fycm93cwCgyCGAAWNpdADRLOEs5CxvAtcsAAAAAN4scgBuAGWgHSNyAACgHSNvAHAAAKAOI24AZwBvYXIAaQAAoPklYwByAADgNdjK3IABZGlyAPMs9yz6LG8AdAAAoPAi7CFkZWlhaQBmoLUlAKC0JQABYW0DLQYtcgDyAMosbAA7gPwA/EDhIm5nbGUAoKcpgAdBQkRhY2RlZmxub3Byc3oAJy0qLTAtNC2bLZ0toS2/LcMtxy3TLdgt3C3gLfwtcgDyABADYQByAHag6CoAoOkqYQBzAOgA/gIAAW5yOC08LechcnQAoJwpgANla25wcnN0AJkpSC1NLVQtXi1iLYItYQBwAHAA4QAaHG8AdABoAGkAbgDnAKEXgAFoaXIAoSmzJFotbwBwAPQAdCVooJUh7wD4JgABaXVmLWotZwBtAOEAuygAAWJwbi14LXMjZXRuZXEAceCKIgD+AODLKgD+cyNldG5lcQBx4IsiAP4A4MwqAP4AAWhyhi2KLWUAdADhABIraSNhbmdsZQAAAWxyki2WLeUhZnQAoLIiaSJnaHQAAKCzInkAMmThIXNoAKCiIoABZWxyAKcttC24LWKiKCKuLQAAAACyLWEAcgAAoLsicQAAoFoi7CFpcACg7iIAAWJ0vC1eD2EA8gBfD3IAAOA12DPddAByAOkAlS1zAHUAAAFicM0t0C0A4IIi0iAA4IMi0iBwAGYAAOA12GfdcgBvAPAAWQt0AHIA6QCaLQABY3XkLegtcgAA4DXYy9wAAWJw7C30LW4AAAFFZXUt8S0A4IoiAP5uAAABRWV/LfktAOCLIgD+6SJnemFnAKCaKYADY2Vmb3BycwANLhAuJS4pLiMuLi40LukhcmN1YQABZGkULiEuAAFiZxguHC5hAHIAAKBfKmUAcaAnIgCgWSLlIXJwAKAYIXIAAOA12DTdcABmAADgNdho3WWgQCJhAHQA6ABqD2MAcgAA4DXYzNzjCuQRUC4AAFQuAABYLmIuAAAAAGMubS5wLnQuAAAAAIguki4AAJouJxIqEnQAcgDpAB0ScgAA4DXYNd0AAUFhWy5eLnIA8gDnAnIA8gCTB75jAAFBYWYuaS5yAPIA4AJyAPIAjAdhAPAAeh5pAHMAAKD7IoABZHB0APgReS6DLgABZmx9LoAuAOA12GnddQDzAP8RaQBtAOUABBIAAUFhiy6OLnIA8gDuAnIA8gCaBwABY3GVLgoScgAA4DXYzdwAAXB0nS6hLmwAdQDzACUScgDpACASAARhY2VmaW9zdbEuvC7ELsguzC7PLtQu2S5jAAABdXm2LrsudABlADuA/QD9QE9kAAFpecAuwy5yAGMAd2FLZG4AO4ClAKVAcgAA4DXYNt1jAHkAV2RwAGYAAOA12GrdYwByAADgNdjO3AABY23dLt8ueQBOZGwAO4D/AP9AAAVhY2RlZmhpb3N38y73Lv8uAi8MLxAvEy8YLx0vIi9jInV0ZQB6YQABYXn7Lv4u8iFvbn5hN2RvAHQAfGEAAWV0Bi8KL3QAcgDmAB8QYQC2Y3IAAOA12DfdYwB5ADZk5yJyYXJyAKDdIXAAZgAA4DXYa91jAHIAAOA12M/cAAFqbiYvKC8AoA0gagAAoAwg");
  var xu = Cu("AAJhZ2xxBwARABMAFQBtAg0AAAAAAA8AcAAmYG8AcwAnYHQAPmB0ADxg9SFvdCJg");
  var ue;
  (function(e) {
    e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.FLAG13 = 8192] = "FLAG13", e[e.BRANCH_LENGTH = 8064] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(ue || (ue = {}));
  var Q;
  (function(e) {
    e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
  })(Q || (Q = {}));
  var a0 = 32;
  function kr(e) {
    return e >= Q.ZERO && e <= Q.NINE;
  }
  function Xn(e) {
    return e >= Q.UPPER_A && e <= Q.UPPER_F || e >= Q.LOWER_A && e <= Q.LOWER_F;
  }
  function jn(e) {
    return e >= Q.UPPER_A && e <= Q.UPPER_Z || e >= Q.LOWER_A && e <= Q.LOWER_Z || kr(e);
  }
  function zn(e) {
    return e === Q.EQUALS || jn(e);
  }
  var X;
  (function(e) {
    e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
  })(X || (X = {}));
  var xe;
  (function(e) {
    e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
  })(xe || (xe = {}));
  var Nu = class {
    constructor(t, u, r) {
      this.decodeTree = t, this.emitCodePoint = u, this.errors = r, this.state = X.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = xe.Strict, this.runConsumed = 0;
    }
    startEntity(t) {
      this.decodeMode = t, this.state = X.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1, this.runConsumed = 0;
    }
    write(t, u) {
      switch (this.state) {
        case X.EntityStart:
          return t.charCodeAt(u) === Q.NUM ? (this.state = X.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = X.NamedEntity, this.stateNamedEntity(t, u));
        case X.NumericStart:
          return this.stateNumericStart(t, u);
        case X.NumericDecimal:
          return this.stateNumericDecimal(t, u);
        case X.NumericHex:
          return this.stateNumericHex(t, u);
        case X.NamedEntity:
          return this.stateNamedEntity(t, u);
      }
    }
    stateNumericStart(t, u) {
      return u >= t.length ? -1 : (t.charCodeAt(u) | a0) === Q.LOWER_X ? (this.state = X.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = X.NumericDecimal, this.stateNumericDecimal(t, u));
    }
    stateNumericHex(t, u) {
      for (; u < t.length; ) {
        let r = t.charCodeAt(u);
        if (kr(r) || Xn(r)) {
          let i = r <= Q.NINE ? r - Q.ZERO : (r | a0) - Q.LOWER_A + 10;
          this.result = this.result * 16 + i, this.consumed++, u++;
        } else return this.emitNumericEntity(r, 3);
      }
      return -1;
    }
    stateNumericDecimal(t, u) {
      for (; u < t.length; ) {
        let r = t.charCodeAt(u);
        if (kr(r)) this.result = this.result * 10 + (r - Q.ZERO), this.consumed++, u++;
        else return this.emitNumericEntity(r, 2);
      }
      return -1;
    }
    emitNumericEntity(t, u) {
      var r;
      if (this.consumed <= u) return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      if (t === Q.SEMI) this.consumed += 1;
      else if (this.decodeMode === xe.Strict) return 0;
      return this.emitCodePoint(wr(this.result), this.consumed), this.errors && (t !== Q.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
    }
    stateNamedEntity(t, u) {
      let { decodeTree: r } = this, i = r[this.treeIndex], n = (i & ue.VALUE_LENGTH) >> 14;
      for (; u < t.length; ) {
        if (n === 0 && (i & ue.FLAG13) !== 0) {
          let A = (i & ue.BRANCH_LENGTH) >> 7;
          if (this.runConsumed === 0) {
            let l = i & ue.JUMP_TABLE;
            if (t.charCodeAt(u) !== l) return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
            u++, this.excess++, this.runConsumed++;
          }
          for (; this.runConsumed < A; ) {
            if (u >= t.length) return -1;
            let l = this.runConsumed - 1, f = r[this.treeIndex + 1 + (l >> 1)], m = l % 2 === 0 ? f & 255 : f >> 8 & 255;
            if (t.charCodeAt(u) !== m) return this.runConsumed = 0, this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
            u++, this.excess++, this.runConsumed++;
          }
          this.runConsumed = 0, this.treeIndex += 1 + (A >> 1), i = r[this.treeIndex], n = (i & ue.VALUE_LENGTH) >> 14;
        }
        if (u >= t.length) break;
        let s = t.charCodeAt(u);
        if (s === Q.SEMI && n !== 0 && (i & ue.FLAG13) !== 0) return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
        if (this.treeIndex = $n(r, i, this.treeIndex + Math.max(1, n), s), this.treeIndex < 0) return this.result === 0 || this.decodeMode === xe.Attribute && (n === 0 || zn(s)) ? 0 : this.emitNotTerminatedNamedEntity();
        if (i = r[this.treeIndex], n = (i & ue.VALUE_LENGTH) >> 14, n !== 0) {
          if (s === Q.SEMI) return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
          this.decodeMode !== xe.Strict && (i & ue.FLAG13) === 0 && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
        }
        u++, this.excess++;
      }
      return -1;
    }
    emitNotTerminatedNamedEntity() {
      var t;
      let { result: u, decodeTree: r } = this, i = (r[u] & ue.VALUE_LENGTH) >> 14;
      return this.emitNamedEntityData(u, i, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
    }
    emitNamedEntityData(t, u, r) {
      let { decodeTree: i } = this;
      return this.emitCodePoint(u === 1 ? i[t] & ~(ue.VALUE_LENGTH | ue.FLAG13) : i[t + 1], r), u === 3 && this.emitCodePoint(i[t + 2], r), r;
    }
    end() {
      var t;
      switch (this.state) {
        case X.NamedEntity:
          return this.result !== 0 && (this.decodeMode !== xe.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        case X.NumericDecimal:
          return this.emitNumericEntity(0, 2);
        case X.NumericHex:
          return this.emitNumericEntity(0, 3);
        case X.NumericStart:
          return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        case X.EntityStart:
          return 0;
      }
    }
  };
  function $n(e, t, u, r) {
    let i = (t & ue.BRANCH_LENGTH) >> 7, n = t & ue.JUMP_TABLE;
    if (i === 0) return n !== 0 && r === n ? u : -1;
    if (n) {
      let f = r - n;
      return f < 0 || f >= i ? -1 : e[u + f] - 1;
    }
    let s = i + 1 >> 1, A = 0, l = i - 1;
    for (; A <= l; ) {
      let f = A + l >>> 1, m = f >> 1, I = e[u + m] >> (f & 1) * 8 & 255;
      if (I < r) A = f + 1;
      else if (I > r) l = f - 1;
      else return e[u + s + f];
    }
    return -1;
  }
  var D;
  (function(e) {
    e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket";
  })(D || (D = {}));
  var p;
  (function(e) {
    e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.InSpecialComment = 20] = "InSpecialComment", e[e.InCommentLike = 21] = "InCommentLike", e[e.BeforeSpecialS = 22] = "BeforeSpecialS", e[e.BeforeSpecialT = 23] = "BeforeSpecialT", e[e.SpecialStartSequence = 24] = "SpecialStartSequence", e[e.InSpecialTag = 25] = "InSpecialTag", e[e.InEntity = 26] = "InEntity";
  })(p || (p = {}));
  function Me(e) {
    return e === D.Space || e === D.NewLine || e === D.Tab || e === D.FormFeed || e === D.CarriageReturn;
  }
  function Su(e) {
    return e === D.Slash || e === D.Gt || Me(e);
  }
  function es(e) {
    return e >= D.LowerA && e <= D.LowerZ || e >= D.UpperA && e <= D.UpperZ;
  }
  var ge;
  (function(e) {
    e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double";
  })(ge || (ge = {}));
  var W = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]), XmpEnd: new Uint8Array([60, 47, 120, 109, 112]) }, ht = class {
    constructor({ xmlMode: t = false, decodeEntities: u = true }, r) {
      this.cbs = r, this.state = p.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = p.Text, this.isSpecial = false, this.running = true, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.xmlMode = t, this.decodeEntities = u, this.entityDecoder = new Nu(t ? xu : _u, (i, n) => this.emitCodePoint(i, n));
    }
    reset() {
      this.state = p.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = p.Text, this.currentSequence = void 0, this.running = true, this.offset = 0;
    }
    write(t) {
      this.offset += this.buffer.length, this.buffer = t, this.parse();
    }
    end() {
      this.running && this.finish();
    }
    pause() {
      this.running = false;
    }
    resume() {
      this.running = true, this.index < this.buffer.length + this.offset && this.parse();
    }
    stateText(t) {
      t === D.Lt || !this.decodeEntities && this.fastForwardTo(D.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = p.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === D.Amp && this.startEntity();
    }
    stateSpecialStartSequence(t) {
      let u = this.sequenceIndex === this.currentSequence.length;
      if (!(u ? Su(t) : (t | 32) === this.currentSequence[this.sequenceIndex])) this.isSpecial = false;
      else if (!u) {
        this.sequenceIndex++;
        return;
      }
      this.sequenceIndex = 0, this.state = p.InTagName, this.stateInTagName(t);
    }
    stateInSpecialTag(t) {
      if (this.sequenceIndex === this.currentSequence.length) {
        if (t === D.Gt || Me(t)) {
          let u = this.index - this.currentSequence.length;
          if (this.sectionStart < u) {
            let r = this.index;
            this.index = u, this.cbs.ontext(this.sectionStart, u), this.index = r;
          }
          this.isSpecial = false, this.sectionStart = u + 2, this.stateInClosingTagName(t);
          return;
        }
        this.sequenceIndex = 0;
      }
      (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === W.TitleEnd ? this.decodeEntities && t === D.Amp && this.startEntity() : this.fastForwardTo(D.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === D.Lt);
    }
    stateCDATASequence(t) {
      t === W.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === W.Cdata.length && (this.state = p.InCommentLike, this.currentSequence = W.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = p.InDeclaration, this.stateInDeclaration(t));
    }
    fastForwardTo(t) {
      for (; ++this.index < this.buffer.length + this.offset; ) if (this.buffer.charCodeAt(this.index - this.offset) === t) return true;
      return this.index = this.buffer.length + this.offset - 1, false;
    }
    stateInCommentLike(t) {
      t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === W.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = p.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
    }
    isTagStartChar(t) {
      return this.xmlMode ? !Su(t) : es(t);
    }
    startSpecial(t, u) {
      this.isSpecial = true, this.currentSequence = t, this.sequenceIndex = u, this.state = p.SpecialStartSequence;
    }
    stateBeforeTagName(t) {
      if (t === D.ExclamationMark) this.state = p.BeforeDeclaration, this.sectionStart = this.index + 1;
      else if (t === D.Questionmark) this.state = p.InProcessingInstruction, this.sectionStart = this.index + 1;
      else if (this.isTagStartChar(t)) {
        let u = t | 32;
        this.sectionStart = this.index, this.xmlMode ? this.state = p.InTagName : u === W.ScriptEnd[2] ? this.state = p.BeforeSpecialS : u === W.TitleEnd[2] || u === W.XmpEnd[2] ? this.state = p.BeforeSpecialT : this.state = p.InTagName;
      } else t === D.Slash ? this.state = p.BeforeClosingTagName : (this.state = p.Text, this.stateText(t));
    }
    stateInTagName(t) {
      Su(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = p.BeforeAttributeName, this.stateBeforeAttributeName(t));
    }
    stateBeforeClosingTagName(t) {
      Me(t) || (t === D.Gt ? this.state = p.Text : (this.state = this.isTagStartChar(t) ? p.InClosingTagName : p.InSpecialComment, this.sectionStart = this.index));
    }
    stateInClosingTagName(t) {
      (t === D.Gt || Me(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = p.AfterClosingTagName, this.stateAfterClosingTagName(t));
    }
    stateAfterClosingTagName(t) {
      (t === D.Gt || this.fastForwardTo(D.Gt)) && (this.state = p.Text, this.sectionStart = this.index + 1);
    }
    stateBeforeAttributeName(t) {
      t === D.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = p.InSpecialTag, this.sequenceIndex = 0) : this.state = p.Text, this.sectionStart = this.index + 1) : t === D.Slash ? this.state = p.InSelfClosingTag : Me(t) || (this.state = p.InAttributeName, this.sectionStart = this.index);
    }
    stateInSelfClosingTag(t) {
      t === D.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = p.Text, this.sectionStart = this.index + 1, this.isSpecial = false) : Me(t) || (this.state = p.BeforeAttributeName, this.stateBeforeAttributeName(t));
    }
    stateInAttributeName(t) {
      (t === D.Eq || Su(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = this.index, this.state = p.AfterAttributeName, this.stateAfterAttributeName(t));
    }
    stateAfterAttributeName(t) {
      t === D.Eq ? this.state = p.BeforeAttributeValue : t === D.Slash || t === D.Gt ? (this.cbs.onattribend(ge.NoValue, this.sectionStart), this.sectionStart = -1, this.state = p.BeforeAttributeName, this.stateBeforeAttributeName(t)) : Me(t) || (this.cbs.onattribend(ge.NoValue, this.sectionStart), this.state = p.InAttributeName, this.sectionStart = this.index);
    }
    stateBeforeAttributeValue(t) {
      t === D.DoubleQuote ? (this.state = p.InAttributeValueDq, this.sectionStart = this.index + 1) : t === D.SingleQuote ? (this.state = p.InAttributeValueSq, this.sectionStart = this.index + 1) : Me(t) || (this.sectionStart = this.index, this.state = p.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
    }
    handleInAttributeValue(t, u) {
      t === u || !this.decodeEntities && this.fastForwardTo(u) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(u === D.DoubleQuote ? ge.Double : ge.Single, this.index + 1), this.state = p.BeforeAttributeName) : this.decodeEntities && t === D.Amp && this.startEntity();
    }
    stateInAttributeValueDoubleQuotes(t) {
      this.handleInAttributeValue(t, D.DoubleQuote);
    }
    stateInAttributeValueSingleQuotes(t) {
      this.handleInAttributeValue(t, D.SingleQuote);
    }
    stateInAttributeValueNoQuotes(t) {
      Me(t) || t === D.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(ge.Unquoted, this.index), this.state = p.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === D.Amp && this.startEntity();
    }
    stateBeforeDeclaration(t) {
      t === D.OpeningSquareBracket ? (this.state = p.CDATASequence, this.sequenceIndex = 0) : this.state = t === D.Dash ? p.BeforeComment : p.InDeclaration;
    }
    stateInDeclaration(t) {
      (t === D.Gt || this.fastForwardTo(D.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = p.Text, this.sectionStart = this.index + 1);
    }
    stateInProcessingInstruction(t) {
      (t === D.Gt || this.fastForwardTo(D.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = p.Text, this.sectionStart = this.index + 1);
    }
    stateBeforeComment(t) {
      t === D.Dash ? (this.state = p.InCommentLike, this.currentSequence = W.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = p.InDeclaration;
    }
    stateInSpecialComment(t) {
      (t === D.Gt || this.fastForwardTo(D.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = p.Text, this.sectionStart = this.index + 1);
    }
    stateBeforeSpecialS(t) {
      let u = t | 32;
      u === W.ScriptEnd[3] ? this.startSpecial(W.ScriptEnd, 4) : u === W.StyleEnd[3] ? this.startSpecial(W.StyleEnd, 4) : (this.state = p.InTagName, this.stateInTagName(t));
    }
    stateBeforeSpecialT(t) {
      switch (t | 32) {
        case W.TitleEnd[3]: {
          this.startSpecial(W.TitleEnd, 4);
          break;
        }
        case W.TextareaEnd[3]: {
          this.startSpecial(W.TextareaEnd, 4);
          break;
        }
        case W.XmpEnd[3]: {
          this.startSpecial(W.XmpEnd, 4);
          break;
        }
        default:
          this.state = p.InTagName, this.stateInTagName(t);
      }
    }
    startEntity() {
      this.baseState = this.state, this.state = p.InEntity, this.entityStart = this.index, this.entityDecoder.startEntity(this.xmlMode ? xe.Strict : this.baseState === p.Text || this.baseState === p.InSpecialTag ? xe.Legacy : xe.Attribute);
    }
    stateInEntity() {
      let t = this.index - this.offset, u = this.entityDecoder.write(this.buffer, t);
      if (u >= 0) this.state = this.baseState, u === 0 && (this.index -= 1);
      else {
        if (t < this.buffer.length && this.buffer.charCodeAt(t) === D.Amp) {
          this.state = this.baseState, this.index -= 1;
          return;
        }
        this.index = this.offset + this.buffer.length - 1;
      }
    }
    cleanup() {
      this.running && this.sectionStart !== this.index && (this.state === p.Text || this.state === p.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === p.InAttributeValueDq || this.state === p.InAttributeValueSq || this.state === p.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
    }
    shouldContinue() {
      return this.index < this.buffer.length + this.offset && this.running;
    }
    parse() {
      for (; this.shouldContinue(); ) {
        let t = this.buffer.charCodeAt(this.index - this.offset);
        switch (this.state) {
          case p.Text: {
            this.stateText(t);
            break;
          }
          case p.SpecialStartSequence: {
            this.stateSpecialStartSequence(t);
            break;
          }
          case p.InSpecialTag: {
            this.stateInSpecialTag(t);
            break;
          }
          case p.CDATASequence: {
            this.stateCDATASequence(t);
            break;
          }
          case p.InAttributeValueDq: {
            this.stateInAttributeValueDoubleQuotes(t);
            break;
          }
          case p.InAttributeName: {
            this.stateInAttributeName(t);
            break;
          }
          case p.InCommentLike: {
            this.stateInCommentLike(t);
            break;
          }
          case p.InSpecialComment: {
            this.stateInSpecialComment(t);
            break;
          }
          case p.BeforeAttributeName: {
            this.stateBeforeAttributeName(t);
            break;
          }
          case p.InTagName: {
            this.stateInTagName(t);
            break;
          }
          case p.InClosingTagName: {
            this.stateInClosingTagName(t);
            break;
          }
          case p.BeforeTagName: {
            this.stateBeforeTagName(t);
            break;
          }
          case p.AfterAttributeName: {
            this.stateAfterAttributeName(t);
            break;
          }
          case p.InAttributeValueSq: {
            this.stateInAttributeValueSingleQuotes(t);
            break;
          }
          case p.BeforeAttributeValue: {
            this.stateBeforeAttributeValue(t);
            break;
          }
          case p.BeforeClosingTagName: {
            this.stateBeforeClosingTagName(t);
            break;
          }
          case p.AfterClosingTagName: {
            this.stateAfterClosingTagName(t);
            break;
          }
          case p.BeforeSpecialS: {
            this.stateBeforeSpecialS(t);
            break;
          }
          case p.BeforeSpecialT: {
            this.stateBeforeSpecialT(t);
            break;
          }
          case p.InAttributeValueNq: {
            this.stateInAttributeValueNoQuotes(t);
            break;
          }
          case p.InSelfClosingTag: {
            this.stateInSelfClosingTag(t);
            break;
          }
          case p.InDeclaration: {
            this.stateInDeclaration(t);
            break;
          }
          case p.BeforeDeclaration: {
            this.stateBeforeDeclaration(t);
            break;
          }
          case p.BeforeComment: {
            this.stateBeforeComment(t);
            break;
          }
          case p.InProcessingInstruction: {
            this.stateInProcessingInstruction(t);
            break;
          }
          case p.InEntity: {
            this.stateInEntity();
            break;
          }
        }
        this.index++;
      }
      this.cleanup();
    }
    finish() {
      this.state === p.InEntity && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
    }
    handleTrailingData() {
      let t = this.buffer.length + this.offset;
      this.sectionStart >= t || (this.state === p.InCommentLike ? this.currentSequence === W.CdataEnd ? this.cbs.oncdata(this.sectionStart, t, 0) : this.cbs.oncomment(this.sectionStart, t, 0) : this.state === p.InTagName || this.state === p.BeforeAttributeName || this.state === p.BeforeAttributeValue || this.state === p.AfterAttributeName || this.state === p.InAttributeName || this.state === p.InAttributeValueSq || this.state === p.InAttributeValueDq || this.state === p.InAttributeValueNq || this.state === p.InClosingTagName || this.cbs.ontext(this.sectionStart, t));
    }
    emitCodePoint(t, u) {
      this.baseState !== p.Text && this.baseState !== p.InSpecialTag ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + u, this.index = this.sectionStart - 1, this.cbs.onattribentity(t)) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + u, this.index = this.sectionStart - 1, this.cbs.ontextentity(t, this.sectionStart));
    }
  };
  var bt = /* @__PURE__ */ new Set(["input", "option", "optgroup", "select", "button", "datalist", "textarea"]), F = /* @__PURE__ */ new Set(["p"]), i0 = /* @__PURE__ */ new Set(["thead", "tbody"]), n0 = /* @__PURE__ */ new Set(["dd", "dt"]), s0 = /* @__PURE__ */ new Set(["rt", "rp"]), ts = /* @__PURE__ */ new Map([["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])], ["th", /* @__PURE__ */ new Set(["th"])], ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])], ["body", /* @__PURE__ */ new Set(["head", "link", "script"])], ["li", /* @__PURE__ */ new Set(["li"])], ["p", F], ["h1", F], ["h2", F], ["h3", F], ["h4", F], ["h5", F], ["h6", F], ["select", bt], ["input", bt], ["output", bt], ["button", bt], ["datalist", bt], ["textarea", bt], ["option", /* @__PURE__ */ new Set(["option"])], ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])], ["dd", n0], ["dt", n0], ["address", F], ["article", F], ["aside", F], ["blockquote", F], ["details", F], ["div", F], ["dl", F], ["fieldset", F], ["figcaption", F], ["figure", F], ["footer", F], ["form", F], ["header", F], ["hr", F], ["main", F], ["nav", F], ["ol", F], ["pre", F], ["section", F], ["table", F], ["ul", F], ["rt", s0], ["rp", s0], ["tbody", i0], ["tfoot", i0]]), us = /* @__PURE__ */ new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]), c0 = /* @__PURE__ */ new Set(["math", "svg"]), o0 = /* @__PURE__ */ new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignobject", "desc", "title"]), rs = /\s|\//, vt = class {
    constructor(t, u = {}) {
      var r, i, n, s, A, l;
      this.options = u, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = false, this.cbs = t != null ? t : {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = (r = u.lowerCaseTags) !== null && r !== void 0 ? r : this.htmlMode, this.lowerCaseAttributeNames = (i = u.lowerCaseAttributeNames) !== null && i !== void 0 ? i : this.htmlMode, this.recognizeSelfClosing = (n = u.recognizeSelfClosing) !== null && n !== void 0 ? n : !this.htmlMode, this.tokenizer = new ((s = u.Tokenizer) !== null && s !== void 0 ? s : ht)(this.options, this), this.foreignContext = [!this.htmlMode], (l = (A = this.cbs).onparserinit) === null || l === void 0 || l.call(A, this);
    }
    ontext(t, u) {
      var r, i;
      let n = this.getSlice(t, u);
      this.endIndex = u - 1, (i = (r = this.cbs).ontext) === null || i === void 0 || i.call(r, n), this.startIndex = u;
    }
    ontextentity(t, u) {
      var r, i;
      this.endIndex = u - 1, (i = (r = this.cbs).ontext) === null || i === void 0 || i.call(r, Pt(t)), this.startIndex = u;
    }
    isVoidElement(t) {
      return this.htmlMode && us.has(t);
    }
    onopentagname(t, u) {
      this.endIndex = u;
      let r = this.getSlice(t, u);
      this.lowerCaseTagNames && (r = r.toLowerCase()), this.emitOpenTag(r);
    }
    emitOpenTag(t) {
      var u, r, i, n;
      this.openTagStart = this.startIndex, this.tagname = t;
      let s = this.htmlMode && ts.get(t);
      if (s) for (; this.stack.length > 0 && s.has(this.stack[0]); ) {
        let A = this.stack.shift();
        (r = (u = this.cbs).onclosetag) === null || r === void 0 || r.call(u, A, true);
      }
      this.isVoidElement(t) || (this.stack.unshift(t), this.htmlMode && (c0.has(t) ? this.foreignContext.unshift(true) : o0.has(t) && this.foreignContext.unshift(false))), (n = (i = this.cbs).onopentagname) === null || n === void 0 || n.call(i, t), this.cbs.onopentag && (this.attribs = {});
    }
    endOpenTag(t) {
      var u, r;
      this.startIndex = this.openTagStart, this.attribs && ((r = (u = this.cbs).onopentag) === null || r === void 0 || r.call(u, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, true), this.tagname = "";
    }
    onopentagend(t) {
      this.endIndex = t, this.endOpenTag(false), this.startIndex = t + 1;
    }
    onclosetag(t, u) {
      var r, i, n, s, A, l, f, m;
      this.endIndex = u;
      let T = this.getSlice(t, u);
      if (this.lowerCaseTagNames && (T = T.toLowerCase()), this.htmlMode && (c0.has(T) || o0.has(T)) && this.foreignContext.shift(), this.isVoidElement(T)) this.htmlMode && T === "br" && ((s = (n = this.cbs).onopentagname) === null || s === void 0 || s.call(n, "br"), (l = (A = this.cbs).onopentag) === null || l === void 0 || l.call(A, "br", {}, true), (m = (f = this.cbs).onclosetag) === null || m === void 0 || m.call(f, "br", false));
      else {
        let I = this.stack.indexOf(T);
        if (I !== -1) for (let x = 0; x <= I; x++) {
          let S = this.stack.shift();
          (i = (r = this.cbs).onclosetag) === null || i === void 0 || i.call(r, S, x !== I);
        }
        else this.htmlMode && T === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(true));
      }
      this.startIndex = u + 1;
    }
    onselfclosingtag(t) {
      this.endIndex = t, this.recognizeSelfClosing || this.foreignContext[0] ? (this.closeCurrentTag(false), this.startIndex = t + 1) : this.onopentagend(t);
    }
    closeCurrentTag(t) {
      var u, r;
      let i = this.tagname;
      this.endOpenTag(t), this.stack[0] === i && ((r = (u = this.cbs).onclosetag) === null || r === void 0 || r.call(u, i, !t), this.stack.shift());
    }
    onattribname(t, u) {
      this.startIndex = t;
      let r = this.getSlice(t, u);
      this.attribname = this.lowerCaseAttributeNames ? r.toLowerCase() : r;
    }
    onattribdata(t, u) {
      this.attribvalue += this.getSlice(t, u);
    }
    onattribentity(t) {
      this.attribvalue += Pt(t);
    }
    onattribend(t, u) {
      var r, i;
      this.endIndex = u, (i = (r = this.cbs).onattribute) === null || i === void 0 || i.call(r, this.attribname, this.attribvalue, t === ge.Double ? '"' : t === ge.Single ? "'" : t === ge.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
    }
    getInstructionName(t) {
      let u = t.search(rs), r = u < 0 ? t : t.substr(0, u);
      return this.lowerCaseTagNames && (r = r.toLowerCase()), r;
    }
    ondeclaration(t, u) {
      this.endIndex = u;
      let r = this.getSlice(t, u);
      if (this.cbs.onprocessinginstruction) {
        let i = this.getInstructionName(r);
        this.cbs.onprocessinginstruction("!".concat(i), "!".concat(r));
      }
      this.startIndex = u + 1;
    }
    onprocessinginstruction(t, u) {
      this.endIndex = u;
      let r = this.getSlice(t, u);
      if (this.cbs.onprocessinginstruction) {
        let i = this.getInstructionName(r);
        this.cbs.onprocessinginstruction("?".concat(i), "?".concat(r));
      }
      this.startIndex = u + 1;
    }
    oncomment(t, u, r) {
      var i, n, s, A;
      this.endIndex = u, (n = (i = this.cbs).oncomment) === null || n === void 0 || n.call(i, this.getSlice(t, u - r)), (A = (s = this.cbs).oncommentend) === null || A === void 0 || A.call(s), this.startIndex = u + 1;
    }
    oncdata(t, u, r) {
      var i, n, s, A, l, f, m, T, I, x;
      this.endIndex = u;
      let S = this.getSlice(t, u - r);
      !this.htmlMode || this.options.recognizeCDATA ? ((n = (i = this.cbs).oncdatastart) === null || n === void 0 || n.call(i), (A = (s = this.cbs).ontext) === null || A === void 0 || A.call(s, S), (f = (l = this.cbs).oncdataend) === null || f === void 0 || f.call(l)) : ((T = (m = this.cbs).oncomment) === null || T === void 0 || T.call(m, "[CDATA[".concat(S, "]]")), (x = (I = this.cbs).oncommentend) === null || x === void 0 || x.call(I)), this.startIndex = u + 1;
    }
    onend() {
      var t, u;
      if (this.cbs.onclosetag) {
        this.endIndex = this.startIndex;
        for (let r = 0; r < this.stack.length; r++) this.cbs.onclosetag(this.stack[r], true);
      }
      (u = (t = this.cbs).onend) === null || u === void 0 || u.call(t);
    }
    reset() {
      var t, u, r, i;
      (u = (t = this.cbs).onreset) === null || u === void 0 || u.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (i = (r = this.cbs).onparserinit) === null || i === void 0 || i.call(r, this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(!this.htmlMode), this.bufferOffset = 0, this.writeIndex = 0, this.ended = false;
    }
    parseComplete(t) {
      this.reset(), this.end(t);
    }
    getSlice(t, u) {
      for (; t - this.bufferOffset >= this.buffers[0].length; ) this.shiftBuffer();
      let r = this.buffers[0].slice(t - this.bufferOffset, u - this.bufferOffset);
      for (; u - this.bufferOffset > this.buffers[0].length; ) this.shiftBuffer(), r += this.buffers[0].slice(0, u - this.bufferOffset);
      return r;
    }
    shiftBuffer() {
      this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
    }
    write(t) {
      var u, r;
      if (this.ended) {
        (r = (u = this.cbs).onerror) === null || r === void 0 || r.call(u, new Error(".write() after done!"));
        return;
      }
      this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
    }
    end(t) {
      var u, r;
      if (this.ended) {
        (r = (u = this.cbs).onerror) === null || r === void 0 || r.call(u, new Error(".end() after done!"));
        return;
      }
      t && this.write(t), this.ended = true, this.tokenizer.end();
    }
    pause() {
      this.tokenizer.pause();
    }
    resume() {
      for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; ) this.tokenizer.write(this.buffers[this.writeIndex++]);
      this.ended && this.tokenizer.end();
    }
    parseChunk(t) {
      this.write(t);
    }
    done(t) {
      this.end(t);
    }
  };
  function A0(e, t) {
    let u = new dt(void 0, t);
    return new vt(u, t).end(e), u.root;
  }
  var Fr, Ut = (Fr = Object.hasOwn) !== null && Fr !== void 0 ? Fr : ((e, t) => Object.prototype.hasOwnProperty.call(e, t)), Ht = /\s+/, Pr = "data-", vr = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, as = /^{[^]*}$|^\[[^]*]$/;
  function Du(e, t, u) {
    var r;
    if (!(!e || !_(e))) {
      if ((r = e.attribs) !== null && r !== void 0 || (e.attribs = {}), !t) return e.attribs;
      if (Ut(e.attribs, t)) return !u && vr.test(t) ? t : e.attribs[t];
      if (e.name === "option" && t === "value") return at(e.children);
      if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && t === "value") return "on";
    }
  }
  function mt(e, t, u) {
    u === null ? h0(e, t) : e.attribs[t] = "".concat(u);
  }
  function is(e, t) {
    if (typeof e == "object" || t !== void 0) {
      if (typeof t == "function") {
        if (typeof e != "string") throw new Error("Bad combination of arguments.");
        return P(this, (u, r) => {
          _(u) && mt(u, e, t.call(u, r, u.attribs[e]));
        });
      }
      return P(this, (u) => {
        if (_(u)) if (typeof e == "object") for (let r of Object.keys(e)) {
          let i = e[r];
          mt(u, r, i);
        }
        else mt(u, e, t);
      });
    }
    return arguments.length > 1 ? this : Du(this[0], e, this.options.xmlMode);
  }
  function d0(e, t, u) {
    return t in e ? e[t] : !u && vr.test(t) ? Du(e, t, false) !== void 0 : Du(e, t, u);
  }
  function Mr(e, t, u, r) {
    t in e ? e[t] = u : mt(e, t, !r && vr.test(t) ? u ? "" : null : "".concat(u));
  }
  function ns(e, t) {
    var u;
    if (typeof e == "string" && t === void 0) {
      let r = this[0];
      if (!r) return;
      switch (e) {
        case "style": {
          let i = this.css(), n = Object.keys(i);
          for (let s = 0; s < n.length; s++) i[s] = n[s];
          return i.length = n.length, i;
        }
        case "tagName":
        case "nodeName":
          return _(r) ? r.name.toUpperCase() : void 0;
        case "href":
        case "src": {
          if (!_(r)) return;
          let i = (u = r.attribs) === null || u === void 0 ? void 0 : u[e];
          return typeof URL < "u" && (e === "href" && (r.tagName === "a" || r.tagName === "link") || e === "src" && (r.tagName === "img" || r.tagName === "iframe" || r.tagName === "audio" || r.tagName === "video" || r.tagName === "source")) && i !== void 0 && this.options.baseURI ? new URL(i, this.options.baseURI).href : i;
        }
        case "innerText":
          return wt(r);
        case "textContent":
          return we(r);
        case "outerHTML":
          return r.type === de.Root ? this.html() : this.clone().wrap("<container />").parent().html();
        case "innerHTML":
          return this.html();
        default:
          return _(r) ? d0(r, e, this.options.xmlMode) : void 0;
      }
    }
    if (typeof e == "object" || t !== void 0) {
      if (typeof t == "function") {
        if (typeof e == "object") throw new TypeError("Bad combination of arguments.");
        return P(this, (r, i) => {
          _(r) && Mr(r, e, t.call(r, i, d0(r, e, this.options.xmlMode)), this.options.xmlMode);
        });
      }
      return P(this, (r) => {
        if (_(r)) if (typeof e == "object") for (let i of Object.keys(e)) {
          let n = e[i];
          Mr(r, i, n, this.options.xmlMode);
        }
        else Mr(r, e, t, this.options.xmlMode);
      });
    }
  }
  function l0(e, t, u) {
    var r;
    (r = e.data) !== null && r !== void 0 || (e.data = {}), typeof t == "object" ? Object.assign(e.data, t) : typeof t == "string" && u !== void 0 && (e.data[t] = u);
  }
  function ss(e) {
    for (let t of Object.keys(e.attribs)) {
      if (!t.startsWith(Pr)) continue;
      let u = u0(t.slice(Pr.length));
      Ut(e.data, u) || (e.data[u] = f0(e.attribs[t]));
    }
    return e.data;
  }
  function cs(e, t) {
    let u = Pr + r0(t), r = e.data;
    if (Ut(r, t)) return r[t];
    if (Ut(e.attribs, u)) return r[t] = f0(e.attribs[u]);
  }
  function f0(e) {
    if (e === "null") return null;
    if (e === "true") return true;
    if (e === "false") return false;
    let t = Number(e);
    if (e === String(t)) return t;
    if (as.test(e)) try {
      return JSON.parse(e);
    } catch (u) {
    }
    return e;
  }
  function os(e, t) {
    var u;
    let r = this[0];
    if (!r || !_(r)) return;
    let i = r;
    return (u = i.data) !== null && u !== void 0 || (i.data = {}), e == null ? ss(i) : typeof e == "object" || t !== void 0 ? (P(this, (n) => {
      _(n) && (typeof e == "object" ? l0(n, e) : l0(n, e, t));
    }), this) : cs(i, e);
  }
  function As(e) {
    let t = arguments.length === 0, u = this[0];
    if (!u || !_(u)) return t ? void 0 : this;
    switch (u.name) {
      case "textarea":
        return this.text(e);
      case "select": {
        let r = this.find("option:selected");
        if (!t) {
          if (this.attr("multiple") == null && typeof e == "object") return this;
          this.find("option").removeAttr("selected");
          let i = typeof e == "object" ? e : [e];
          for (let n of i) this.find('option[value="'.concat(n, '"]')).attr("selected", "");
          return this;
        }
        return this.attr("multiple") ? r.toArray().map((i) => at(i.children)) : r.attr("value");
      }
      case "button":
      case "input":
      case "option":
        return t ? this.attr("value") : this.attr("value", e);
    }
  }
  function h0(e, t) {
    !e.attribs || !Ut(e.attribs, t) || delete e.attribs[t];
  }
  function yu(e) {
    return e ? e.trim().split(Ht) : [];
  }
  function ds(e) {
    let t = yu(e);
    for (let u of t) P(this, (r) => {
      _(r) && h0(r, u);
    });
    return this;
  }
  function ls(e) {
    return this.toArray().some((t) => {
      let u = _(t) && t.attribs.class, r = -1;
      if (u && e.length > 0) for (; (r = u.indexOf(e, r + 1)) > -1; ) {
        let i = r + e.length;
        if ((r === 0 || Ht.test(u[r - 1])) && (i === u.length || Ht.test(u[i]))) return true;
      }
      return false;
    });
  }
  function b0(e) {
    if (typeof e == "function") return P(this, (r, i) => {
      if (_(r)) {
        let n = r.attribs.class || "";
        b0.call([r], e.call(r, i, n));
      }
    });
    if (!e || typeof e != "string") return this;
    let t = e.split(Ht), u = this.length;
    for (let r = 0; r < u; r++) {
      let i = this[r];
      if (!_(i)) continue;
      let n = Du(i, "class", false);
      if (n) {
        let s = " ".concat(n, " ");
        for (let A of t) {
          let l = "".concat(A, " ");
          s.includes(" ".concat(l)) || (s += l);
        }
        mt(i, "class", s.trim());
      } else mt(i, "class", t.join(" ").trim());
    }
    return this;
  }
  function m0(e) {
    if (typeof e == "function") return P(this, (i, n) => {
      _(i) && m0.call([i], e.call(i, n, i.attribs.class || ""));
    });
    let t = yu(e), u = t.length, r = arguments.length === 0;
    return P(this, (i) => {
      if (_(i)) if (r) i.attribs.class = "";
      else {
        let n = yu(i.attribs.class), s = false;
        for (let A = 0; A < u; A++) {
          let l = n.indexOf(t[A]);
          l !== -1 && (n.splice(l, 1), s = true, A--);
        }
        s && (i.attribs.class = n.join(" "));
      }
    });
  }
  function E0(e, t) {
    if (typeof e == "function") return P(this, (s, A) => {
      _(s) && E0.call([s], e.call(s, A, s.attribs.class || "", t), t);
    });
    if (!e || typeof e != "string") return this;
    let u = e.split(Ht), r = u.length, i = typeof t == "boolean" ? t ? 1 : -1 : 0, n = this.length;
    for (let s = 0; s < n; s++) {
      let A = this[s];
      if (!_(A)) continue;
      let l = yu(A.attribs.class);
      for (let f = 0; f < r; f++) {
        let m = l.indexOf(u[f]);
        i >= 0 && m === -1 ? l.push(u[f]) : i <= 0 && m !== -1 && l.splice(m, 1);
      }
      A.attribs.class = l.join(" ");
    }
    return this;
  }
  var ca = {};
  Ae(ca, { _findBySelector: () => vs, add: () => lc, addBack: () => fc, children: () => Xs, closest: () => Ys, contents: () => js, each: () => zs, end: () => dc, eq: () => nc, filter: () => ec, filterArray: () => sa, find: () => Ps, first: () => ac, get: () => sc, has: () => rc, index: () => oc, is: () => tc, last: () => ic, map: () => $s, next: () => Gs, nextAll: () => Ks, nextUntil: () => Ws, not: () => uc, parent: () => Us, parents: () => Hs, parentsUntil: () => Qs, prev: () => Js, prevAll: () => qs, prevUntil: () => Vs, siblings: () => Zs, slice: () => Ac, toArray: () => cc });
  var N;
  (function(e) {
    e.Attribute = "attribute", e.Pseudo = "pseudo", e.PseudoElement = "pseudo-element", e.Tag = "tag", e.Universal = "universal", e.Adjacent = "adjacent", e.Child = "child", e.Descendant = "descendant", e.Parent = "parent", e.Sibling = "sibling", e.ColumnCombinator = "column-combinator";
  })(N || (N = {}));
  var K;
  (function(e) {
    e.Any = "any", e.Element = "element", e.End = "end", e.Equals = "equals", e.Exists = "exists", e.Hyphen = "hyphen", e.Not = "not", e.Start = "start";
  })(K || (K = {}));
  var p0 = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, fs = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, hs = /* @__PURE__ */ new Map([[126, K.Element], [94, K.Start], [36, K.End], [42, K.Any], [33, K.Not], [124, K.Hyphen]]), bs = /* @__PURE__ */ new Set(["has", "not", "matches", "is", "where", "host", "host-context"]);
  function nt(e) {
    switch (e.type) {
      case N.Adjacent:
      case N.Child:
      case N.Descendant:
      case N.Parent:
      case N.Sibling:
      case N.ColumnCombinator:
        return true;
      default:
        return false;
    }
  }
  var ms = /* @__PURE__ */ new Set(["contains", "icontains"]);
  function Es(e, t, u) {
    let r = parseInt(t, 16) - 65536;
    return r !== r || u ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320);
  }
  function Qt(e) {
    return e.replace(fs, Es);
  }
  function Hr(e) {
    return e === 39 || e === 34;
  }
  function g0(e) {
    return e === 32 || e === 9 || e === 10 || e === 12 || e === 13;
  }
  function Pe(e) {
    let t = [], u = T0(t, "".concat(e), 0);
    if (u < e.length) throw new Error("Unmatched selector: ".concat(e.slice(u)));
    return t;
  }
  function T0(e, t, u) {
    let r = [];
    function i(I) {
      let x = t.slice(u + I).match(p0);
      if (!x) throw new Error("Expected name, found ".concat(t.slice(u)));
      let [S] = x;
      return u += I + S.length, Qt(S);
    }
    function n(I) {
      for (u += I; u < t.length && g0(t.charCodeAt(u)); ) u++;
    }
    function s() {
      u += 1;
      let I = u, x = 1;
      for (; x > 0 && u < t.length; u++) t.charCodeAt(u) === 40 && !A(u) ? x++ : t.charCodeAt(u) === 41 && !A(u) && x--;
      if (x) throw new Error("Parenthesis not matched");
      return Qt(t.slice(I, u - 1));
    }
    function A(I) {
      let x = 0;
      for (; t.charCodeAt(--I) === 92; ) x++;
      return (x & 1) === 1;
    }
    function l() {
      if (r.length > 0 && nt(r[r.length - 1])) throw new Error("Did not expect successive traversals.");
    }
    function f(I) {
      if (r.length > 0 && r[r.length - 1].type === N.Descendant) {
        r[r.length - 1].type = I;
        return;
      }
      l(), r.push({ type: I });
    }
    function m(I, x) {
      r.push({ type: N.Attribute, name: I, action: x, value: i(1), namespace: null, ignoreCase: "quirks" });
    }
    function T() {
      if (r.length && r[r.length - 1].type === N.Descendant && r.pop(), r.length === 0) throw new Error("Empty sub-selector");
      e.push(r);
    }
    if (n(0), t.length === u) return u;
    e: for (; u < t.length; ) {
      let I = t.charCodeAt(u);
      switch (I) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (r.length === 0 || r[0].type !== N.Descendant) && (l(), r.push({ type: N.Descendant })), n(1);
          break;
        }
        case 62: {
          f(N.Child), n(1);
          break;
        }
        case 60: {
          f(N.Parent), n(1);
          break;
        }
        case 126: {
          f(N.Sibling), n(1);
          break;
        }
        case 43: {
          f(N.Adjacent), n(1);
          break;
        }
        case 46: {
          m("class", K.Element);
          break;
        }
        case 35: {
          m("id", K.Equals);
          break;
        }
        case 91: {
          n(1);
          let x, S = null;
          t.charCodeAt(u) === 124 ? x = i(1) : t.startsWith("*|", u) ? (S = "*", x = i(2)) : (x = i(0), t.charCodeAt(u) === 124 && t.charCodeAt(u + 1) !== 61 && (S = x, x = i(1))), n(0);
          let U = K.Exists, $ = hs.get(t.charCodeAt(u));
          if ($) {
            if (U = $, t.charCodeAt(u + 1) !== 61) throw new Error("Expected `=`");
            n(2);
          } else t.charCodeAt(u) === 61 && (U = K.Equals, n(1));
          let w = "", C = null;
          if (U !== "exists") {
            if (Hr(t.charCodeAt(u))) {
              let q = t.charCodeAt(u), ee = u + 1;
              for (; ee < t.length && (t.charCodeAt(ee) !== q || A(ee)); ) ee += 1;
              if (t.charCodeAt(ee) !== q) throw new Error("Attribute value didn't end");
              w = Qt(t.slice(u + 1, ee)), u = ee + 1;
            } else {
              let q = u;
              for (; u < t.length && (!g0(t.charCodeAt(u)) && t.charCodeAt(u) !== 93 || A(u)); ) u += 1;
              w = Qt(t.slice(q, u));
            }
            n(0);
            let H = t.charCodeAt(u) | 32;
            H === 115 ? (C = false, n(1)) : H === 105 && (C = true, n(1));
          }
          if (t.charCodeAt(u) !== 93) throw new Error("Attribute selector didn't terminate");
          u += 1;
          let O = { type: N.Attribute, name: x, action: U, value: w, namespace: S, ignoreCase: C };
          r.push(O);
          break;
        }
        case 58: {
          if (t.charCodeAt(u + 1) === 58) {
            r.push({ type: N.PseudoElement, name: i(2).toLowerCase(), data: t.charCodeAt(u) === 40 ? s() : null });
            continue;
          }
          let x = i(1).toLowerCase(), S = null;
          if (t.charCodeAt(u) === 40) if (bs.has(x)) {
            if (Hr(t.charCodeAt(u + 1))) throw new Error("Pseudo-selector ".concat(x, " cannot be quoted"));
            if (S = [], u = T0(S, t, u + 1), t.charCodeAt(u) !== 41) throw new Error("Missing closing parenthesis in :".concat(x, " (").concat(t, ")"));
            u += 1;
          } else {
            if (S = s(), ms.has(x)) {
              let U = S.charCodeAt(0);
              U === S.charCodeAt(S.length - 1) && Hr(U) && (S = S.slice(1, -1));
            }
            S = Qt(S);
          }
          r.push({ type: N.Pseudo, name: x, data: S });
          break;
        }
        case 44: {
          T(), r = [], n(1);
          break;
        }
        default: {
          if (t.startsWith("/*", u)) {
            let U = t.indexOf("*/", u + 2);
            if (U < 0) throw new Error("Comment was not terminated");
            u = U + 2, r.length === 0 && n(0);
            break;
          }
          let x = null, S;
          if (I === 42) u += 1, S = "*";
          else if (I === 124) {
            if (S = "", t.charCodeAt(u + 1) === 124) {
              f(N.ColumnCombinator), n(2);
              break;
            }
          } else if (p0.test(t.slice(u))) S = i(0);
          else break e;
          t.charCodeAt(u) === 124 && t.charCodeAt(u + 1) !== 124 && (x = S, t.charCodeAt(u + 1) === 42 ? (S = "*", u += 2) : S = i(1)), r.push(S === "*" ? { type: N.Universal, namespace: x } : { type: N.Tag, name: S, namespace: x });
        }
      }
    }
    return T(), u;
  }
  var jr = ze(Ke(), 1);
  var ve = ze(Ke(), 1);
  var C0 = /* @__PURE__ */ new Map([[N.Universal, 50], [N.Tag, 30], [N.Attribute, 1], [N.Pseudo, 0]]);
  function Yt(e) {
    return !C0.has(e.type);
  }
  var ps = /* @__PURE__ */ new Map([[K.Exists, 10], [K.Equals, 8], [K.Not, 7], [K.Start, 6], [K.End, 6], [K.Any, 5]]);
  function Qr(e) {
    let t = e.map(_0);
    for (let u = 1; u < e.length; u++) {
      let r = t[u];
      if (!(r < 0)) for (let i = u - 1; i >= 0 && r < t[i]; i--) {
        let n = e[i + 1];
        e[i + 1] = e[i], e[i] = n, t[i + 1] = t[i], t[i] = r;
      }
    }
  }
  function _0(e) {
    var t, u;
    let r = (t = C0.get(e.type)) !== null && t !== void 0 ? t : -1;
    return e.type === N.Attribute ? (r = (u = ps.get(e.action)) !== null && u !== void 0 ? u : 4, e.action === K.Equals && e.name === "id" && (r = 9), e.ignoreCase && (r >>= 1)) : e.type === N.Pseudo && (e.data ? e.name === "has" || e.name === "contains" ? r = 0 : Array.isArray(e.data) ? (r = Math.min(...e.data.map((i) => Math.min(...i.map(_0)))), r < 0 && (r = 0)) : r = 2 : r = 3), r;
  }
  var Gt = ze(Ke(), 1), gs = /[-[\]{}()*+?.,\\^$|#\s]/g;
  function x0(e) {
    return e.replace(gs, "\\$&");
  }
  var Ts = /* @__PURE__ */ new Set(["accept", "accept-charset", "align", "alink", "axis", "bgcolor", "charset", "checked", "clear", "codetype", "color", "compact", "declare", "defer", "dir", "direction", "disabled", "enctype", "face", "frame", "hreflang", "http-equiv", "lang", "language", "link", "media", "method", "multiple", "nohref", "noresize", "noshade", "nowrap", "readonly", "rel", "rev", "rules", "scope", "scrolling", "selected", "shape", "target", "text", "type", "valign", "valuetype", "vlink"]);
  function st(e, t) {
    return typeof e.ignoreCase == "boolean" ? e.ignoreCase : e.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && Ts.has(e.name);
  }
  var N0 = { equals(e, t, u) {
    let { adapter: r } = u, { name: i } = t, { value: n } = t;
    return st(t, u) ? (n = n.toLowerCase(), (s) => {
      let A = r.getAttributeValue(s, i);
      return A != null && A.length === n.length && A.toLowerCase() === n && e(s);
    }) : (s) => r.getAttributeValue(s, i) === n && e(s);
  }, hyphen(e, t, u) {
    let { adapter: r } = u, { name: i } = t, { value: n } = t, s = n.length;
    return st(t, u) ? (n = n.toLowerCase(), function(l) {
      let f = r.getAttributeValue(l, i);
      return f != null && (f.length === s || f.charAt(s) === "-") && f.substr(0, s).toLowerCase() === n && e(l);
    }) : function(l) {
      let f = r.getAttributeValue(l, i);
      return f != null && (f.length === s || f.charAt(s) === "-") && f.substr(0, s) === n && e(l);
    };
  }, element(e, t, u) {
    let { adapter: r } = u, { name: i, value: n } = t;
    if (/\s/.test(n)) return Gt.default.falseFunc;
    let s = new RegExp("(?:^|\\s)".concat(x0(n), "(?:$|\\s)"), st(t, u) ? "i" : "");
    return function(l) {
      let f = r.getAttributeValue(l, i);
      return f != null && f.length >= n.length && s.test(f) && e(l);
    };
  }, exists(e, { name: t }, { adapter: u }) {
    return (r) => u.hasAttrib(r, t) && e(r);
  }, start(e, t, u) {
    let { adapter: r } = u, { name: i } = t, { value: n } = t, s = n.length;
    return s === 0 ? Gt.default.falseFunc : st(t, u) ? (n = n.toLowerCase(), (A) => {
      let l = r.getAttributeValue(A, i);
      return l != null && l.length >= s && l.substr(0, s).toLowerCase() === n && e(A);
    }) : (A) => {
      var l;
      return !!(!((l = r.getAttributeValue(A, i)) === null || l === void 0) && l.startsWith(n)) && e(A);
    };
  }, end(e, t, u) {
    let { adapter: r } = u, { name: i } = t, { value: n } = t, s = -n.length;
    return s === 0 ? Gt.default.falseFunc : st(t, u) ? (n = n.toLowerCase(), (A) => {
      var l;
      return ((l = r.getAttributeValue(A, i)) === null || l === void 0 ? void 0 : l.substr(s).toLowerCase()) === n && e(A);
    }) : (A) => {
      var l;
      return !!(!((l = r.getAttributeValue(A, i)) === null || l === void 0) && l.endsWith(n)) && e(A);
    };
  }, any(e, t, u) {
    let { adapter: r } = u, { name: i, value: n } = t;
    if (n === "") return Gt.default.falseFunc;
    if (st(t, u)) {
      let s = new RegExp(x0(n), "i");
      return function(l) {
        let f = r.getAttributeValue(l, i);
        return f != null && f.length >= n.length && s.test(f) && e(l);
      };
    }
    return (s) => {
      var A;
      return !!(!((A = r.getAttributeValue(s, i)) === null || A === void 0) && A.includes(n)) && e(s);
    };
  }, not(e, t, u) {
    let { adapter: r } = u, { name: i } = t, { value: n } = t;
    return n === "" ? (s) => !!r.getAttributeValue(s, i) && e(s) : st(t, u) ? (n = n.toLowerCase(), (s) => {
      let A = r.getAttributeValue(s, i);
      return (A == null || A.length !== n.length || A.toLowerCase() !== n) && e(s);
    }) : (s) => r.getAttributeValue(s, i) !== n && e(s);
  } };
  var Is = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), S0 = 48, Cs = 57;
  function D0(e) {
    if (e = e.trim().toLowerCase(), e === "even") return [2, 0];
    if (e === "odd") return [2, 1];
    let t = 0, u = 0, r = n(), i = s();
    if (t < e.length && e.charAt(t) === "n" && (t++, u = r * (i != null ? i : 1), A(), t < e.length ? (r = n(), A(), i = s()) : r = i = 0), i === null || t < e.length) throw new Error("n-th rule couldn't be parsed ('".concat(e, "')"));
    return [u, r * i];
    function n() {
      return e.charAt(t) === "-" ? (t++, -1) : (e.charAt(t) === "+" && t++, 1);
    }
    function s() {
      let l = t, f = 0;
      for (; t < e.length && e.charCodeAt(t) >= S0 && e.charCodeAt(t) <= Cs; ) f = f * 10 + (e.charCodeAt(t) - S0), t++;
      return t === l ? null : f;
    }
    function A() {
      for (; t < e.length && Is.has(e.charCodeAt(t)); ) t++;
    }
  }
  var Yr = ze(Ke(), 1);
  function y0(e) {
    let t = e[0], u = e[1] - 1;
    if (u < 0 && t <= 0) return Yr.default.falseFunc;
    if (t === -1) return (n) => n <= u;
    if (t === 0) return (n) => n === u;
    if (t === 1) return u < 0 ? Yr.default.trueFunc : (n) => n >= u;
    let r = Math.abs(t), i = (u % r + r) % r;
    return t > 1 ? (n) => n >= u && n % r === i : (n) => n <= u && n % r === i;
  }
  function Et(e) {
    return y0(D0(e));
  }
  var oe = ze(Ke(), 1);
  function Bu(e, t) {
    return (u) => {
      let r = t.getParent(u);
      return r != null && t.isTag(r) && e(u);
    };
  }
  var pt = { contains(e, t, { adapter: u }) {
    return function(i) {
      return e(i) && u.getText(i).includes(t);
    };
  }, icontains(e, t, { adapter: u }) {
    let r = t.toLowerCase();
    return function(n) {
      return e(n) && u.getText(n).toLowerCase().includes(r);
    };
  }, "nth-child"(e, t, { adapter: u, equals: r }) {
    let i = Et(t);
    return i === oe.default.falseFunc ? oe.default.falseFunc : i === oe.default.trueFunc ? Bu(e, u) : function(s) {
      let A = u.getSiblings(s), l = 0;
      for (let f = 0; f < A.length && !r(s, A[f]); f++) u.isTag(A[f]) && l++;
      return i(l) && e(s);
    };
  }, "nth-last-child"(e, t, { adapter: u, equals: r }) {
    let i = Et(t);
    return i === oe.default.falseFunc ? oe.default.falseFunc : i === oe.default.trueFunc ? Bu(e, u) : function(s) {
      let A = u.getSiblings(s), l = 0;
      for (let f = A.length - 1; f >= 0 && !r(s, A[f]); f--) u.isTag(A[f]) && l++;
      return i(l) && e(s);
    };
  }, "nth-of-type"(e, t, { adapter: u, equals: r }) {
    let i = Et(t);
    return i === oe.default.falseFunc ? oe.default.falseFunc : i === oe.default.trueFunc ? Bu(e, u) : function(s) {
      let A = u.getSiblings(s), l = 0;
      for (let f = 0; f < A.length; f++) {
        let m = A[f];
        if (r(s, m)) break;
        u.isTag(m) && u.getName(m) === u.getName(s) && l++;
      }
      return i(l) && e(s);
    };
  }, "nth-last-of-type"(e, t, { adapter: u, equals: r }) {
    let i = Et(t);
    return i === oe.default.falseFunc ? oe.default.falseFunc : i === oe.default.trueFunc ? Bu(e, u) : function(s) {
      let A = u.getSiblings(s), l = 0;
      for (let f = A.length - 1; f >= 0; f--) {
        let m = A[f];
        if (r(s, m)) break;
        u.isTag(m) && u.getName(m) === u.getName(s) && l++;
      }
      return i(l) && e(s);
    };
  }, root(e, t, { adapter: u }) {
    return (r) => {
      let i = u.getParent(r);
      return (i == null || !u.isTag(i)) && e(r);
    };
  }, scope(e, t, u, r) {
    let { equals: i } = u;
    return !r || r.length === 0 ? pt.root(e, t, u) : r.length === 1 ? (n) => i(r[0], n) && e(n) : (n) => r.includes(n) && e(n);
  }, hover: Gr("isHovered"), visited: Gr("isVisited"), active: Gr("isActive") };
  function Gr(e) {
    return function(u, r, { adapter: i }) {
      let n = i[e];
      return typeof n != "function" ? oe.default.falseFunc : function(A) {
        return n(A) && u(A);
      };
    };
  }
  var Kt = { empty(e, { adapter: t }) {
    return !t.getChildren(e).some((u) => t.isTag(u) || t.getText(u) !== "");
  }, "first-child"(e, { adapter: t, equals: u }) {
    if (t.prevElementSibling) return t.prevElementSibling(e) == null;
    let r = t.getSiblings(e).find((i) => t.isTag(i));
    return r != null && u(e, r);
  }, "last-child"(e, { adapter: t, equals: u }) {
    let r = t.getSiblings(e);
    for (let i = r.length - 1; i >= 0; i--) {
      if (u(e, r[i])) return true;
      if (t.isTag(r[i])) break;
    }
    return false;
  }, "first-of-type"(e, { adapter: t, equals: u }) {
    let r = t.getSiblings(e), i = t.getName(e);
    for (let n = 0; n < r.length; n++) {
      let s = r[n];
      if (u(e, s)) return true;
      if (t.isTag(s) && t.getName(s) === i) break;
    }
    return false;
  }, "last-of-type"(e, { adapter: t, equals: u }) {
    let r = t.getSiblings(e), i = t.getName(e);
    for (let n = r.length - 1; n >= 0; n--) {
      let s = r[n];
      if (u(e, s)) return true;
      if (t.isTag(s) && t.getName(s) === i) break;
    }
    return false;
  }, "only-of-type"(e, { adapter: t, equals: u }) {
    let r = t.getName(e);
    return t.getSiblings(e).every((i) => u(e, i) || !t.isTag(i) || t.getName(i) !== r);
  }, "only-child"(e, { adapter: t, equals: u }) {
    return t.getSiblings(e).every((r) => u(e, r) || !t.isTag(r));
  } };
  function Kr(e, t, u, r) {
    if (u === null) {
      if (e.length > r) throw new Error("Pseudo-class :".concat(t, " requires an argument"));
    } else if (e.length === r) throw new Error("Pseudo-class :".concat(t, " doesn't have any arguments"));
  }
  var Ru = { "any-link": ":is(a, area, link)[href]", link: ":any-link:not(:visited)", disabled: ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )", enabled: ":not(:disabled)", checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)", required: ":is(input, select, textarea)[required]", optional: ":is(input, select, textarea):not([required])", selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)", checkbox: "[type=checkbox]", file: "[type=file]", password: "[type=password]", radio: "[type=radio]", reset: "[type=reset]", image: "[type=image]", submit: "[type=submit]", parent: ":not(:empty)", header: ":is(h1, h2, h3, h4, h5, h6)", button: ":is(button, input[type=button])", input: ":is(input, textarea, select, button)", text: "input:is(:not([type!='']), [type=text])" };
  var Te = ze(Ke(), 1);
  var qr = {};
  function Vr(e, t) {
    return e === Te.default.falseFunc ? Te.default.falseFunc : (u) => t.isTag(u) && e(u);
  }
  function Zr(e, t) {
    let u = t.getSiblings(e);
    if (u.length <= 1) return [];
    let r = u.indexOf(e);
    return r < 0 || r === u.length - 1 ? [] : u.slice(r + 1).filter(t.isTag);
  }
  function Jr(e) {
    return { xmlMode: !!e.xmlMode, lowerCaseAttributeNames: !!e.lowerCaseAttributeNames, lowerCaseTags: !!e.lowerCaseTags, quirksMode: !!e.quirksMode, cacheResults: !!e.cacheResults, pseudos: e.pseudos, adapter: e.adapter, equals: e.equals };
  }
  var Wr = (e, t, u, r, i) => {
    let n = i(t, Jr(u), r);
    return n === Te.default.trueFunc ? e : n === Te.default.falseFunc ? Te.default.falseFunc : (s) => n(s) && e(s);
  }, Lu = { is: Wr, matches: Wr, where: Wr, not(e, t, u, r, i) {
    let n = i(t, Jr(u), r);
    return n === Te.default.falseFunc ? e : n === Te.default.trueFunc ? Te.default.falseFunc : (s) => !n(s) && e(s);
  }, has(e, t, u, r, i) {
    let { adapter: n } = u, s = Jr(u);
    s.relativeSelector = true;
    let A = t.some((m) => m.some(Yt)) ? [qr] : void 0, l = i(t, s, A);
    if (l === Te.default.falseFunc) return Te.default.falseFunc;
    let f = Vr(l, n);
    if (A && l !== Te.default.trueFunc) {
      let { shouldTestNextSiblings: m = false } = l;
      return (T) => {
        if (!e(T)) return false;
        A[0] = T;
        let I = n.getChildren(T), x = m ? [...I, ...Zr(T, n)] : I;
        return n.existsOne(f, x);
      };
    }
    return (m) => e(m) && n.existsOne(f, n.getChildren(m));
  } };
  function B0(e, t, u, r, i) {
    var n;
    let { name: s, data: A } = t;
    if (Array.isArray(A)) {
      if (!(s in Lu)) throw new Error("Unknown pseudo-class :".concat(s, "(").concat(A, ")"));
      return Lu[s](e, A, u, r, i);
    }
    let l = (n = u.pseudos) === null || n === void 0 ? void 0 : n[s], f = typeof l == "string" ? l : Ru[s];
    if (typeof f == "string") {
      if (A != null) throw new Error("Pseudo ".concat(s, " doesn't have any arguments"));
      let m = Pe(f);
      return Lu.is(e, m, u, r, i);
    }
    if (typeof l == "function") return Kr(l, s, A, 1), (m) => l(m, A) && e(m);
    if (s in pt) return pt[s](e, A, u, r);
    if (s in Kt) {
      let m = Kt[s];
      return Kr(m, s, A, 2), (T) => m(T, u, A) && e(T);
    }
    throw new Error("Unknown pseudo-class :".concat(s));
  }
  function Xr(e, t) {
    let u = t.getParent(e);
    return u && t.isTag(u) ? u : null;
  }
  function R0(e, t, u, r, i) {
    let { adapter: n, equals: s } = u;
    switch (t.type) {
      case N.PseudoElement:
        throw new Error("Pseudo-elements are not supported by css-select");
      case N.ColumnCombinator:
        throw new Error("Column combinators are not yet supported by css-select");
      case N.Attribute: {
        if (t.namespace != null) throw new Error("Namespaced attributes are not yet supported by css-select");
        return (!u.xmlMode || u.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), N0[t.action](e, t, u);
      }
      case N.Pseudo:
        return B0(e, t, u, r, i);
      case N.Tag: {
        if (t.namespace != null) throw new Error("Namespaced tag names are not yet supported by css-select");
        let { name: A } = t;
        return (!u.xmlMode || u.lowerCaseTags) && (A = A.toLowerCase()), function(f) {
          return n.getName(f) === A && e(f);
        };
      }
      case N.Descendant: {
        if (u.cacheResults === false || typeof WeakSet > "u") return function(f) {
          let m = f;
          for (; m = Xr(m, n); ) if (e(m)) return true;
          return false;
        };
        let A = /* @__PURE__ */ new WeakSet();
        return function(f) {
          let m = f;
          for (; m = Xr(m, n); ) if (!A.has(m)) {
            if (n.isTag(m) && e(m)) return true;
            A.add(m);
          }
          return false;
        };
      }
      case "_flexibleDescendant":
        return function(l) {
          let f = l;
          do
            if (e(f)) return true;
          while (f = Xr(f, n));
          return false;
        };
      case N.Parent:
        return function(l) {
          return n.getChildren(l).some((f) => n.isTag(f) && e(f));
        };
      case N.Child:
        return function(l) {
          let f = n.getParent(l);
          return f != null && n.isTag(f) && e(f);
        };
      case N.Sibling:
        return function(l) {
          let f = n.getSiblings(l);
          for (let m = 0; m < f.length; m++) {
            let T = f[m];
            if (s(l, T)) break;
            if (n.isTag(T) && e(T)) return true;
          }
          return false;
        };
      case N.Adjacent:
        return n.prevElementSibling ? function(l) {
          let f = n.prevElementSibling(l);
          return f != null && e(f);
        } : function(l) {
          let f = n.getSiblings(l), m;
          for (let T = 0; T < f.length; T++) {
            let I = f[T];
            if (s(l, I)) break;
            n.isTag(I) && (m = I);
          }
          return !!m && e(m);
        };
      case N.Universal: {
        if (t.namespace != null && t.namespace !== "*") throw new Error("Namespaced universal selectors are not yet supported by css-select");
        return e;
      }
    }
  }
  function L0(e, t, u) {
    let r = Ou(e, t, u);
    return Vr(r, t.adapter);
  }
  function Ou(e, t, u) {
    let r = typeof e == "string" ? Pe(e) : e;
    return wu(r, t, u);
  }
  function O0(e) {
    return e.type === N.Pseudo && (e.name === "scope" || Array.isArray(e.data) && e.data.some((t) => t.some(O0)));
  }
  var _s = { type: N.Descendant }, xs = { type: "_flexibleDescendant" }, Ns = { type: N.Pseudo, name: "scope", data: null };
  function Ss(e, { adapter: t }, u) {
    let r = !!(u != null && u.every((i) => {
      let n = t.isTag(i) && t.getParent(i);
      return i === qr || n && t.isTag(n);
    }));
    for (let i of e) {
      if (!(i.length > 0 && Yt(i[0]) && i[0].type !== N.Descendant)) if (r && !i.some(O0)) i.unshift(_s);
      else continue;
      i.unshift(Ns);
    }
  }
  function wu(e, t, u) {
    var r;
    e.forEach(Qr), u = (r = t.context) !== null && r !== void 0 ? r : u;
    let i = Array.isArray(u), n = u && (Array.isArray(u) ? u : [u]);
    if (t.relativeSelector !== false) Ss(e, t, n);
    else if (e.some((l) => l.length > 0 && Yt(l[0]))) throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
    let s = false, A = e.map((l) => {
      if (l.length >= 2) {
        let [f, m] = l;
        f.type !== N.Pseudo || f.name !== "scope" || (i && m.type === N.Descendant ? l[1] = xs : (m.type === N.Adjacent || m.type === N.Sibling) && (s = true));
      }
      return Ds(l, t, n);
    }).reduce(ys, ve.default.falseFunc);
    return A.shouldTestNextSiblings = s, A;
  }
  function Ds(e, t, u) {
    var r;
    return e.reduce((i, n) => i === ve.default.falseFunc ? ve.default.falseFunc : R0(i, n, t, u, wu), (r = t.rootFunc) !== null && r !== void 0 ? r : ve.default.trueFunc);
  }
  function ys(e, t) {
    return t === ve.default.falseFunc || e === ve.default.trueFunc ? e : e === ve.default.falseFunc || t === ve.default.trueFunc ? t : function(r) {
      return e(r) || t(r);
    };
  }
  var w0 = (e, t) => e === t, Bs = { adapter: Fe, equals: w0 };
  function k0(e) {
    var t, u, r, i;
    let n = e != null ? e : Bs;
    return (t = n.adapter) !== null && t !== void 0 || (n.adapter = Fe), (u = n.equals) !== null && u !== void 0 || (n.equals = (i = (r = n.adapter) === null || r === void 0 ? void 0 : r.equals) !== null && i !== void 0 ? i : w0), n;
  }
  function zr(e) {
    return function(u, r, i) {
      let n = k0(r);
      return e(u, n, i);
    };
  }
  var rf = zr(L0), af = zr(Ou), ku = zr(wu);
  function F0(e) {
    return function(u, r, i) {
      let n = k0(i);
      typeof u != "function" && (u = Ou(u, n, r));
      let s = Fu(r, n.adapter, u.shouldTestNextSiblings);
      return e(u, s, n);
    };
  }
  function Fu(e, t, u = false) {
    return u && (e = Rs(e, t)), Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e);
  }
  function Rs(e, t) {
    let u = Array.isArray(e) ? e.slice(0) : [e], r = u.length;
    for (let i = 0; i < r; i++) {
      let n = Zr(u[i], t);
      u.push(...n);
    }
    return u;
  }
  var nf = F0((e, t, u) => e === jr.default.falseFunc || !t || t.length === 0 ? [] : u.adapter.findAll(e, t)), sf = F0((e, t, u) => e === jr.default.falseFunc || !t || t.length === 0 ? null : u.adapter.findOne(e, t));
  var Pu = ze(Ke(), 1);
  var Ls = /* @__PURE__ */ new Set(["first", "last", "eq", "gt", "nth", "lt", "even", "odd"]);
  function gt(e) {
    return e.type !== "pseudo" ? false : Ls.has(e.name) ? true : e.name === "not" && Array.isArray(e.data) ? e.data.some((t) => t.some(gt)) : false;
  }
  function M0(e, t, u) {
    let r = t != null ? parseInt(t, 10) : NaN;
    switch (e) {
      case "first":
        return 1;
      case "nth":
      case "eq":
        return isFinite(r) ? r >= 0 ? r + 1 : 1 / 0 : 0;
      case "lt":
        return isFinite(r) ? r >= 0 ? Math.min(r, u) : 1 / 0 : 0;
      case "gt":
        return isFinite(r) ? 1 / 0 : 0;
      case "odd":
        return 2 * u;
      case "even":
        return 2 * u - 1;
      case "last":
      case "not":
        return 1 / 0;
    }
  }
  function P0(e) {
    for (; e.parent; ) e = e.parent;
    return e;
  }
  function Mu(e) {
    let t = [], u = [];
    for (let r of e) r.some(gt) ? t.push(r) : u.push(r);
    return [u, t];
  }
  var Os = { type: N.Universal, namespace: null }, ws = { type: N.Pseudo, name: "scope", data: null };
  function ta(e, t, u = {}) {
    return ua([e], t, u);
  }
  function ua(e, t, u = {}) {
    if (typeof t == "function") return e.some(t);
    let [r, i] = Mu(Pe(t));
    return r.length > 0 && e.some(ku(r, u)) || i.some((n) => U0(n, e, u).length > 0);
  }
  function ks(e, t, u, r) {
    let i = typeof u == "string" ? parseInt(u, 10) : NaN;
    switch (e) {
      case "first":
      case "lt":
        return t;
      case "last":
        return t.length > 0 ? [t[t.length - 1]] : t;
      case "nth":
      case "eq":
        return isFinite(i) && Math.abs(i) < t.length ? [i < 0 ? t[t.length + i] : t[i]] : [];
      case "gt":
        return isFinite(i) ? t.slice(i + 1) : [];
      case "even":
        return t.filter((n, s) => s % 2 === 0);
      case "odd":
        return t.filter((n, s) => s % 2 === 1);
      case "not": {
        let n = new Set(v0(u, t, r));
        return t.filter((s) => !n.has(s));
      }
    }
  }
  function ra(e, t, u = {}) {
    return v0(Pe(e), t, u);
  }
  function v0(e, t, u) {
    if (t.length === 0) return [];
    let [r, i] = Mu(e), n;
    if (r.length) {
      let s = ea(t, r, u);
      if (i.length === 0) return s;
      s.length && (n = new Set(s));
    }
    for (let s = 0; s < i.length && (n == null ? void 0 : n.size) !== t.length; s++) {
      let A = i[s];
      if ((n ? t.filter((m) => _(m) && !n.has(m)) : t).length === 0) break;
      let f = U0(A, t, u);
      if (f.length) if (n) f.forEach((m) => n.add(m));
      else {
        if (s === i.length - 1) return f;
        n = new Set(f);
      }
    }
    return typeof n < "u" ? n.size === t.length ? t : t.filter((s) => n.has(s)) : [];
  }
  function U0(e, t, u) {
    var r;
    if (e.some(nt)) {
      let i = (r = u.root) !== null && r !== void 0 ? r : P0(t[0]), n = _e(L({}, u), { context: t, relativeSelector: false });
      return e.push(ws), vu(i, e, n, true, t.length);
    }
    return vu(t, e, u, false, t.length);
  }
  function H0(e, t, u = {}, r = 1 / 0) {
    if (typeof e == "function") return Q0(t, e);
    let [i, n] = Mu(Pe(e)), s = n.map((A) => vu(t, A, u, true, r));
    return i.length && s.push($r(t, i, u, r)), s.length === 0 ? [] : s.length === 1 ? s[0] : Ye(s.reduce((A, l) => [...A, ...l]));
  }
  function vu(e, t, u, r, i) {
    let n = t.findIndex(gt), s = t.slice(0, n), A = t[n], l = t.length - 1 === n ? i : 1 / 0, f = M0(A.name, A.data, l);
    if (f === 0) return [];
    let T = (s.length === 0 && !Array.isArray(e) ? lt(e).filter(_) : s.length === 0 ? (Array.isArray(e) ? e : [e]).filter(_) : r || s.some(nt) ? $r(e, [s], u, f) : ea(e, [s], u)).slice(0, f), I = ks(A.name, T, A.data, u);
    if (I.length === 0 || t.length === n + 1) return I;
    let x = t.slice(n + 1), S = x.some(nt);
    if (S) {
      if (nt(x[0])) {
        let { type: U } = x[0];
        (U === N.Sibling || U === N.Adjacent) && (I = Fu(I, Fe, true)), x.unshift(Os);
      }
      u = _e(L({}, u), { relativeSelector: false, rootFunc: (U) => I.includes(U) });
    } else u.rootFunc && u.rootFunc !== Pu.trueFunc && (u = _e(L({}, u), { rootFunc: Pu.trueFunc }));
    return x.some(gt) ? vu(I, x, u, false, i) : S ? $r(I, [x], u, i) : ea(I, [x], u);
  }
  function $r(e, t, u, r) {
    let i = ku(t, u, e);
    return Q0(e, i, r);
  }
  function Q0(e, t, u = 1 / 0) {
    let r = Fu(e, Fe, t.shouldTestNextSiblings);
    return pu((i) => _(i) && t(i), r, true, u);
  }
  function ea(e, t, u) {
    let r = (Array.isArray(e) ? e : [e]).filter(_);
    if (r.length === 0) return r;
    let i = ku(t, u);
    return i === Pu.trueFunc ? r : r.filter(i);
  }
  var Ms = /^\s*(?:[+~]|:scope\b)/;
  function Ps(e) {
    if (!e) return this._make([]);
    if (typeof e != "string") {
      let t = pe(e) ? e.toArray() : [e], u = this.toArray();
      return this._make(t.filter((r) => u.some((i) => Ft(i, r))));
    }
    return this._findBySelector(e, Number.POSITIVE_INFINITY);
  }
  function vs(e, t) {
    var u;
    let r = this.toArray(), i = Ms.test(e) ? r : this.children().toArray(), n = { context: r, root: (u = this._root) === null || u === void 0 ? void 0 : u[0], xmlMode: this.options.xmlMode, lowerCaseTags: this.options.lowerCaseTags, lowerCaseAttributeNames: this.options.lowerCaseAttributeNames, pseudos: this.options.pseudos, quirksMode: this.options.quirksMode };
    return this._make(H0(e, i, n, t));
  }
  function aa(e) {
    return function(t, ...u) {
      return function(r) {
        var i;
        let n = e(t, this);
        return r && (n = sa(n, r, this.options.xmlMode, (i = this._root) === null || i === void 0 ? void 0 : i[0])), this._make(this.length > 1 && n.length > 1 ? u.reduce((s, A) => A(s), n) : n);
      };
    };
  }
  var Wt = aa((e, t) => {
    let u = [];
    for (let r = 0; r < t.length; r++) {
      let i = e(t[r]);
      i.length > 0 && (u = u.concat(i));
    }
    return u;
  }), ia = aa((e, t) => {
    let u = [];
    for (let r = 0; r < t.length; r++) {
      let i = e(t[r]);
      i !== null && u.push(i);
    }
    return u;
  });
  function na(e, ...t) {
    let u = null, r = aa((i, n) => {
      let s = [];
      return P(n, (A) => {
        for (let l; (l = i(A)) && !(u != null && u(l, s.length)); A = l) s.push(l);
      }), s;
    })(e, ...t);
    return function(i, n) {
      u = typeof i == "string" ? (A) => ta(A, i, this.options) : i ? Jt(i) : null;
      let s = r.call(this, n);
      return u = null, s;
    };
  }
  function Tt(e) {
    return e.length > 1 ? Array.from(new Set(e)) : e;
  }
  var Us = ia(({ parent: e }) => e && !me(e) ? e : null, Tt), Hs = Wt((e) => {
    let t = [];
    for (; e.parent && !me(e.parent); ) t.push(e.parent), e = e.parent;
    return t;
  }, Ye, (e) => e.reverse()), Qs = na(({ parent: e }) => e && !me(e) ? e : null, Ye, (e) => e.reverse());
  function Ys(e) {
    var t;
    let u = [];
    if (!e) return this._make(u);
    let r = { xmlMode: this.options.xmlMode, root: (t = this._root) === null || t === void 0 ? void 0 : t[0] }, i = typeof e == "string" ? (n) => ta(n, e, r) : Jt(e);
    return P(this, (n) => {
      for (n && !me(n) && !_(n) && (n = n.parent); n && _(n); ) {
        if (i(n, 0)) {
          u.includes(n) || u.push(n);
          break;
        }
        n = n.parent;
      }
    }), this._make(u);
  }
  var Gs = ia((e) => mu(e)), Ks = Wt((e) => {
    let t = [];
    for (; e.next; ) e = e.next, _(e) && t.push(e);
    return t;
  }, Tt), Ws = na((e) => mu(e), Tt), Js = ia((e) => Eu(e)), qs = Wt((e) => {
    let t = [];
    for (; e.prev; ) e = e.prev, _(e) && t.push(e);
    return t;
  }, Tt), Vs = na((e) => Eu(e), Tt), Zs = Wt((e) => Dr(e).filter((t) => _(t) && t !== e), Ye), Xs = Wt((e) => lt(e).filter(_), Tt);
  function js() {
    let e = this.toArray().reduce((t, u) => k(u) ? t.concat(u.children) : t, []);
    return this._make(e);
  }
  function zs(e) {
    let t = 0, u = this.length;
    for (; t < u && e.call(this[t], t, this[t]) !== false; ) ++t;
    return this;
  }
  function $s(e) {
    let t = [];
    for (let u = 0; u < this.length; u++) {
      let r = this[u], i = e.call(r, u, r);
      i != null && (t = t.concat(i));
    }
    return this._make(t);
  }
  function Jt(e) {
    return typeof e == "function" ? (t, u) => e.call(t, u, t) : pe(e) ? (t) => Array.prototype.includes.call(e, t) : function(t) {
      return e === t;
    };
  }
  function ec(e) {
    var t;
    return this._make(sa(this.toArray(), e, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
  }
  function sa(e, t, u, r) {
    return typeof t == "string" ? ra(t, e, { xmlMode: u, root: r }) : e.filter(Jt(t));
  }
  function tc(e) {
    let t = this.toArray();
    return typeof e == "string" ? ua(t.filter(_), e, this.options) : e ? t.some(Jt(e)) : false;
  }
  function uc(e) {
    let t = this.toArray();
    if (typeof e == "string") {
      let u = new Set(ra(e, t, this.options));
      t = t.filter((r) => !u.has(r));
    } else {
      let u = Jt(e);
      t = t.filter((r, i) => !u(r, i));
    }
    return this._make(t);
  }
  function rc(e) {
    return this.filter(typeof e == "string" ? ":has(".concat(e, ")") : (t, u) => this._make(u).find(e).length > 0);
  }
  function ac() {
    return this.length > 1 ? this._make(this[0]) : this;
  }
  function ic() {
    return this.length > 0 ? this._make(this[this.length - 1]) : this;
  }
  function nc(e) {
    var t;
    return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((t = this[e]) !== null && t !== void 0 ? t : []));
  }
  function sc(e) {
    return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
  }
  function cc() {
    return Array.prototype.slice.call(this);
  }
  function oc(e) {
    let t, u;
    return e == null ? (t = this.parent().children(), u = this[0]) : typeof e == "string" ? (t = this._make(e), u = this[0]) : (t = this, u = pe(e) ? e[0] : e), Array.prototype.indexOf.call(t, u);
  }
  function Ac(e, t) {
    return this._make(Array.prototype.slice.call(this, e, t));
  }
  function dc() {
    var e;
    return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
  }
  function lc(e, t) {
    let u = this._make(e, t), r = Ye([...this.get(), ...u.get()]);
    return this._make(r);
  }
  function fc(e) {
    return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this;
  }
  var oa = {};
  Ae(oa, { _makeDomArray: () => hc, after: () => _c, append: () => Ec, appendTo: () => bc, before: () => Nc, clone: () => wc, empty: () => Bc, html: () => Rc, insertAfter: () => xc, insertBefore: () => Sc, prepend: () => pc, prependTo: () => mc, remove: () => Dc, replaceWith: () => yc, text: () => Oc, toString: () => Lc, unwrap: () => Ic, wrap: () => gc, wrapAll: () => Cc, wrapInner: () => Tc });
  function Y0(e) {
    return function(u, r, i, n) {
      if (typeof Buffer < "u" && Buffer.isBuffer(u) && (u = u.toString()), typeof u == "string") return e(u, r, i, n);
      let s = u;
      if (!Array.isArray(s) && me(s)) return s;
      let A = new le([]);
      return We(s, A), A;
    };
  }
  function We(e, t) {
    let u = Array.isArray(e) ? e : [e];
    t ? t.children = u : t = null;
    for (let r = 0; r < u.length; r++) {
      let i = u[r];
      i.parent && i.parent.children !== u && ke(i), t ? (i.prev = u[r - 1] || null, i.next = u[r + 1] || null) : i.prev = i.next = null, i.parent = t;
    }
    return t;
  }
  function hc(e, t) {
    if (e == null) return [];
    if (typeof e == "string") return this._parse(e, this.options, false, null).children.slice(0);
    if ("length" in e) {
      if (e.length === 1) return this._makeDomArray(e[0], t);
      let u = [];
      for (let r = 0; r < e.length; r++) {
        let i = e[r];
        if (typeof i == "object") {
          if (i == null) continue;
          if (!("length" in i)) {
            u.push(t ? At(i, true) : i);
            continue;
          }
        }
        u.push(...this._makeDomArray(i, t));
      }
      return u;
    }
    return [t ? At(e, true) : e];
  }
  function G0(e) {
    return function(...t) {
      let u = this.length - 1;
      return P(this, (r, i) => {
        if (!k(r)) return;
        let n = typeof t[0] == "function" ? t[0].call(r, i, this._render(r.children)) : t, s = this._makeDomArray(n, i < u);
        e(s, r.children, r);
      });
    };
  }
  function Je(e, t, u, r, i) {
    var n, s;
    let A = [t, u, ...r], l = t === 0 ? null : e[t - 1], f = t + u >= e.length ? null : e[t + u];
    for (let m = 0; m < r.length; ++m) {
      let T = r[m], I = T.parent;
      if (I) {
        let S = I.children.indexOf(T);
        S !== -1 && (I.children.splice(S, 1), i === I && t > S && A[0]--);
      }
      T.parent = i, T.prev && (T.prev.next = (n = T.next) !== null && n !== void 0 ? n : null), T.next && (T.next.prev = (s = T.prev) !== null && s !== void 0 ? s : null), T.prev = m === 0 ? l : r[m - 1], T.next = m === r.length - 1 ? f : r[m + 1];
    }
    return l && (l.next = r[0]), f && (f.prev = r[r.length - 1]), e.splice(...A);
  }
  function bc(e) {
    return (pe(e) ? e : this._make(e)).append(this), this;
  }
  function mc(e) {
    return (pe(e) ? e : this._make(e)).prepend(this), this;
  }
  var Ec = G0((e, t, u) => {
    Je(t, t.length, 0, e, u);
  }), pc = G0((e, t, u) => {
    Je(t, 0, 0, e, u);
  });
  function K0(e) {
    return function(t) {
      let u = this.length - 1, r = this.parents().last();
      for (let i = 0; i < this.length; i++) {
        let n = this[i], s = typeof t == "function" ? t.call(n, i, n) : typeof t == "string" && !Mt(t) ? r.find(t).clone() : t, [A] = this._makeDomArray(s, i < u);
        if (!A || !k(A)) continue;
        let l = A, f = 0;
        for (; f < l.children.length; ) {
          let m = l.children[f];
          _(m) ? (l = m, f = 0) : f++;
        }
        e(n, l, [A]);
      }
      return this;
    };
  }
  var gc = K0((e, t, u) => {
    let { parent: r } = e;
    if (!r) return;
    let i = r.children, n = i.indexOf(e);
    We([e], t), Je(i, n, 0, u, r);
  }), Tc = K0((e, t, u) => {
    k(e) && (We(e.children, t), We(u, e));
  });
  function Ic(e) {
    return this.parent(e).not("body").each((t, u) => {
      this._make(u).replaceWith(u.children);
    }), this;
  }
  function Cc(e) {
    let t = this[0];
    if (t) {
      let u = this._make(typeof e == "function" ? e.call(t, 0, t) : e).insertBefore(t), r;
      for (let n = 0; n < u.length; n++) u[n].type === de.Tag && (r = u[n]);
      let i = 0;
      for (; r && i < r.children.length; ) {
        let n = r.children[i];
        n.type === de.Tag ? (r = n, i = 0) : i++;
      }
      r && this._make(r).append(this);
    }
    return this;
  }
  function _c(...e) {
    let t = this.length - 1;
    return P(this, (u, r) => {
      if (!k(u) || !u.parent) return;
      let i = u.parent.children, n = i.indexOf(u);
      if (n === -1) return;
      let s = typeof e[0] == "function" ? e[0].call(u, r, this._render(u.children)) : e, A = this._makeDomArray(s, r < t);
      Je(i, n + 1, 0, A, u.parent);
    });
  }
  function xc(e) {
    typeof e == "string" && (e = this._make(e)), this.remove();
    let t = [];
    for (let u of this._makeDomArray(e)) {
      let r = this.clone().toArray(), { parent: i } = u;
      if (!i) continue;
      let n = i.children, s = n.indexOf(u);
      s !== -1 && (Je(n, s + 1, 0, r, i), t.push(...r));
    }
    return this._make(t);
  }
  function Nc(...e) {
    let t = this.length - 1;
    return P(this, (u, r) => {
      if (!k(u) || !u.parent) return;
      let i = u.parent.children, n = i.indexOf(u);
      if (n === -1) return;
      let s = typeof e[0] == "function" ? e[0].call(u, r, this._render(u.children)) : e, A = this._makeDomArray(s, r < t);
      Je(i, n, 0, A, u.parent);
    });
  }
  function Sc(e) {
    let t = this._make(e);
    this.remove();
    let u = [];
    return P(t, (r) => {
      let i = this.clone().toArray(), { parent: n } = r;
      if (!n) return;
      let s = n.children, A = s.indexOf(r);
      A !== -1 && (Je(s, A, 0, i, n), u.push(...i));
    }), this._make(u);
  }
  function Dc(e) {
    let t = e ? this.filter(e) : this;
    return P(t, (u) => {
      ke(u), u.prev = u.next = u.parent = null;
    }), this;
  }
  function yc(e) {
    return P(this, (t, u) => {
      let { parent: r } = t;
      if (!r) return;
      let i = r.children, n = typeof e == "function" ? e.call(t, u, t) : e, s = this._makeDomArray(n);
      We(s, null);
      let A = i.indexOf(t);
      Je(i, A, 1, s, r), s.includes(t) || (t.parent = t.prev = t.next = null);
    });
  }
  function Bc() {
    return P(this, (e) => {
      if (k(e)) {
        for (let t of e.children) t.next = t.prev = t.parent = null;
        e.children.length = 0;
      }
    });
  }
  function Rc(e) {
    if (e === void 0) {
      let t = this[0];
      return !t || !k(t) ? null : this._render(t.children);
    }
    return P(this, (t) => {
      if (!k(t)) return;
      for (let r of t.children) r.next = r.prev = r.parent = null;
      let u = pe(e) ? e.toArray() : this._parse("".concat(e), this.options, false, t).children;
      We(u, t);
    });
  }
  function Lc() {
    return this._render(this);
  }
  function Oc(e) {
    return e === void 0 ? at(this) : typeof e == "function" ? P(this, (t, u) => this._make(t).text(e.call(t, u, at([t])))) : P(this, (t) => {
      if (!k(t)) return;
      for (let r of t.children) r.next = r.prev = r.parent = null;
      let u = new De("".concat(e));
      We(u, t);
    });
  }
  function wc() {
    let e = Array.prototype.map.call(this.get(), (u) => At(u, true)), t = new le(e);
    for (let u of e) u.parent = t;
    return this._make(e);
  }
  var Aa = {};
  Ae(Aa, { css: () => kc });
  function kc(e, t) {
    if (e != null && t != null || typeof e == "object" && !Array.isArray(e)) return P(this, (u, r) => {
      _(u) && W0(u, e, t, r);
    });
    if (this.length !== 0) return J0(this[0], e);
  }
  function W0(e, t, u, r) {
    if (typeof t == "string") {
      let i = J0(e), n = typeof u == "function" ? u.call(e, r, i[t]) : u;
      n === "" ? delete i[t] : n != null && (i[t] = n), e.attribs.style = Fc(i);
    } else if (typeof t == "object") {
      let i = Object.keys(t);
      for (let n = 0; n < i.length; n++) {
        let s = i[n];
        W0(e, s, t[s], n);
      }
    }
  }
  function J0(e, t) {
    if (!e || !_(e)) return;
    let u = Mc(e.attribs.style);
    if (typeof t == "string") return u[t];
    if (Array.isArray(t)) {
      let r = {};
      for (let i of t) u[i] != null && (r[i] = u[i]);
      return r;
    }
    return u;
  }
  function Fc(e) {
    return Object.keys(e).reduce((t, u) => "".concat(t).concat(t ? " " : "").concat(u, ": ").concat(e[u], ";"), "");
  }
  function Mc(e) {
    if (e = (e || "").trim(), !e) return {};
    let t = {}, u;
    for (let r of e.split(";")) {
      let i = r.indexOf(":");
      if (i < 1 || i === r.length - 1) {
        let n = r.trimEnd();
        n.length > 0 && u !== void 0 && (t[u] += ";".concat(n));
      } else u = r.slice(0, i).trim(), t[u] = r.slice(i + 1).trim();
    }
    return t;
  }
  var da = {};
  Ae(da, { serialize: () => vc, serializeArray: () => Uc });
  var q0 = "input,select,textarea,keygen", Pc = /%20/g, V0 = /\r?\n/g;
  function vc() {
    return this.serializeArray().map((u) => "".concat(encodeURIComponent(u.name), "=").concat(encodeURIComponent(u.value))).join("&").replace(Pc, "+");
  }
  function Uc() {
    return this.map((e, t) => {
      let u = this._make(t);
      return _(t) && t.name === "form" ? u.find(q0).toArray() : u.filter(q0).toArray();
    }).filter('[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))').map((e, t) => {
      var u;
      let r = this._make(t), i = r.attr("name"), n = (u = r.val()) !== null && u !== void 0 ? u : "";
      return Array.isArray(n) ? n.map((s) => ({ name: i, value: s.replace(V0, "\r\n") })) : { name: i, value: n.replace(V0, "\r\n") };
    }).toArray();
  }
  var la = {};
  Ae(la, { extract: () => Qc });
  function Hc(e) {
    var t;
    return typeof e == "string" ? { selector: e, value: "textContent" } : { selector: e.selector, value: (t = e.value) !== null && t !== void 0 ? t : "textContent" };
  }
  function Qc(e) {
    let t = {};
    for (let u in e) {
      let r = e[u], i = Array.isArray(r), { selector: n, value: s } = Hc(i ? r[0] : r), A = typeof s == "function" ? s : typeof s == "string" ? (l) => this._make(l).prop(s) : (l) => this._make(l).extract(s);
      if (i) t[u] = this._findBySelector(n, Number.POSITIVE_INFINITY).map((l, f) => A(f, u, t)).get();
      else {
        let l = this._findBySelector(n, 1);
        t[u] = l.length > 0 ? A(l[0], u, t) : void 0;
      }
    }
    return t;
  }
  var qe = class {
    constructor(t, u, r) {
      if (this.length = 0, this.options = r, this._root = u, t) {
        for (let i = 0; i < t.length; i++) this[i] = t[i];
        this.length = t.length;
      }
    }
  };
  qe.prototype.cheerio = "[cheerio object]";
  qe.prototype.splice = Array.prototype.splice;
  qe.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
  Object.assign(qe.prototype, Ur, ca, oa, Aa, da, la);
  function Z0(e, t) {
    return function u(r, i, n = true) {
      if (r == null) throw new Error("cheerio.load() expects a string");
      let s = kt(i), A = e(r, s, n, null);
      class l extends qe {
        _make(T, I) {
          let x = f(T, I);
          return x.prevObject = this, x;
        }
        _parse(T, I, x, S) {
          return e(T, I, x, S);
        }
        _render(T) {
          return t(T, this.options);
        }
      }
      function f(m, T, I = A, x) {
        if (m && pe(m)) return m;
        let S = kt(x, s), U = typeof I == "string" ? [e(I, S, false, null)] : "length" in I ? I : [I], $ = pe(U) ? U : new l(U, null, S);
        if ($._root = $, !m) return new l(void 0, $, S);
        let w = typeof m == "string" && Mt(m) ? e(m, S, false, null).children : Yc(m) ? [m] : Array.isArray(m) ? m : void 0, C = new l(w, $, S);
        if (w) return C;
        if (typeof m != "string") throw new TypeError("Unexpected type of selector");
        let O = m, H = T ? typeof T == "string" ? Mt(T) ? new l([e(T, S, false, null)], $, S) : (O = "".concat(T, " ").concat(O), $) : pe(T) ? T : new l(Array.isArray(T) ? T : [T], $, S) : $;
        return H ? H.find(O) : C;
      }
      return Object.assign(f, Lr, { load: u, _root: A, _options: s, fn: l.prototype, prototype: l.prototype }), f;
    };
  }
  function Yc(e) {
    return !!e.name || e.type === de.Root || e.type === de.Text || e.type === de.Comment;
  }
  var Gc = /* @__PURE__ */ new Set([65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111]), v = "\uFFFD", c;
  (function(e) {
    e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
  })(c || (c = {}));
  var ne = { DASH_DASH: "--", CDATA_START: "[CDATA[", DOCTYPE: "doctype", SCRIPT: "script", PUBLIC: "public", SYSTEM: "system" };
  function Uu(e) {
    return e >= 55296 && e <= 57343;
  }
  function X0(e) {
    return e >= 56320 && e <= 57343;
  }
  function j0(e, t) {
    return (e - 55296) * 1024 + 9216 + t;
  }
  function Hu(e) {
    return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
  }
  function Qu(e) {
    return e >= 64976 && e <= 65007 || Gc.has(e);
  }
  var b;
  (function(e) {
    e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
  })(b || (b = {}));
  var Wc = 65536, Yu = class {
    constructor(t) {
      this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = false, this.lastChunkWritten = false, this.endOfChunkHit = false, this.bufferWaterline = Wc, this.isEol = false, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
    }
    get col() {
      return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
    }
    get offset() {
      return this.droppedBufferSize + this.pos;
    }
    getError(t, u) {
      let { line: r, col: i, offset: n } = this, s = i + u, A = n + u;
      return { code: t, startLine: r, endLine: r, startCol: s, endCol: s, startOffset: A, endOffset: A };
    }
    _err(t) {
      this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(t, 0)));
    }
    _addGap() {
      this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
    }
    _processSurrogate(t) {
      if (this.pos !== this.html.length - 1) {
        let u = this.html.charCodeAt(this.pos + 1);
        if (X0(u)) return this.pos++, this._addGap(), j0(t, u);
      } else if (!this.lastChunkWritten) return this.endOfChunkHit = true, c.EOF;
      return this._err(b.surrogateInInputStream), t;
    }
    willDropParsedChunk() {
      return this.pos > this.bufferWaterline;
    }
    dropParsedChunk() {
      this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
    }
    write(t, u) {
      this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = false, this.lastChunkWritten = u;
    }
    insertHtmlAtCurrentPos(t) {
      this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = false;
    }
    startsWith(t, u) {
      if (this.pos + t.length > this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, false;
      if (u) return this.html.startsWith(t, this.pos);
      for (let r = 0; r < t.length; r++) if ((this.html.charCodeAt(this.pos + r) | 32) !== t.charCodeAt(r)) return false;
      return true;
    }
    peek(t) {
      let u = this.pos + t;
      if (u >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, c.EOF;
      let r = this.html.charCodeAt(u);
      return r === c.CARRIAGE_RETURN ? c.LINE_FEED : r;
    }
    advance() {
      if (this.pos++, this.isEol && (this.isEol = false, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, c.EOF;
      let t = this.html.charCodeAt(this.pos);
      return t === c.CARRIAGE_RETURN ? (this.isEol = true, this.skipNextNewLine = true, c.LINE_FEED) : t === c.LINE_FEED && (this.isEol = true, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = false, this._addGap(), this.advance()) : (this.skipNextNewLine = false, Uu(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === c.LINE_FEED || t === c.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
    }
    _checkForProblematicCharacters(t) {
      Hu(t) ? this._err(b.controlCharacterInInputStream) : Qu(t) && this._err(b.noncharacterInInputStream);
    }
    retreat(t) {
      for (this.pos -= t; this.pos < this.lastGapPos; ) this.lastGapPos = this.gapStack.pop(), this.pos--;
      this.isEol = false;
    }
  };
  var fa = {};
  Ae(fa, { TokenType: () => B, getTokenAttr: () => qt });
  var B;
  (function(e) {
    e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
  })(B || (B = {}));
  function qt(e, t) {
    for (let u = e.attrs.length - 1; u >= 0; u--) if (e.attrs[u].name === t) return e.attrs[u].value;
    return null;
  }
  var Gu = new Uint16Array('\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((e) => e.charCodeAt(0)));
  var ha, Jc = /* @__PURE__ */ new Map([[0, 65533], [128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]), z0 = (ha = String.fromCodePoint) !== null && ha !== void 0 ? ha : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  };
  function ba(e) {
    var t;
    return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = Jc.get(e)) !== null && t !== void 0 ? t : e;
  }
  var z;
  (function(e) {
    e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
  })(z || (z = {}));
  var Vc = 32, Ve;
  (function(e) {
    e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
  })(Ve || (Ve = {}));
  function ma(e) {
    return e >= z.ZERO && e <= z.NINE;
  }
  function Zc(e) {
    return e >= z.UPPER_A && e <= z.UPPER_F || e >= z.LOWER_A && e <= z.LOWER_F;
  }
  function Xc(e) {
    return e >= z.UPPER_A && e <= z.UPPER_Z || e >= z.LOWER_A && e <= z.LOWER_Z || ma(e);
  }
  function jc(e) {
    return e === z.EQUALS || Xc(e);
  }
  var j;
  (function(e) {
    e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
  })(j || (j = {}));
  var ye;
  (function(e) {
    e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
  })(ye || (ye = {}));
  var Ku = class {
    constructor(t, u, r) {
      this.decodeTree = t, this.emitCodePoint = u, this.errors = r, this.state = j.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = ye.Strict;
    }
    startEntity(t) {
      this.decodeMode = t, this.state = j.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
    }
    write(t, u) {
      switch (this.state) {
        case j.EntityStart:
          return t.charCodeAt(u) === z.NUM ? (this.state = j.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = j.NamedEntity, this.stateNamedEntity(t, u));
        case j.NumericStart:
          return this.stateNumericStart(t, u);
        case j.NumericDecimal:
          return this.stateNumericDecimal(t, u);
        case j.NumericHex:
          return this.stateNumericHex(t, u);
        case j.NamedEntity:
          return this.stateNamedEntity(t, u);
      }
    }
    stateNumericStart(t, u) {
      return u >= t.length ? -1 : (t.charCodeAt(u) | Vc) === z.LOWER_X ? (this.state = j.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = j.NumericDecimal, this.stateNumericDecimal(t, u));
    }
    addToNumericResult(t, u, r, i) {
      if (u !== r) {
        let n = r - u;
        this.result = this.result * Math.pow(i, n) + Number.parseInt(t.substr(u, n), i), this.consumed += n;
      }
    }
    stateNumericHex(t, u) {
      let r = u;
      for (; u < t.length; ) {
        let i = t.charCodeAt(u);
        if (ma(i) || Zc(i)) u += 1;
        else return this.addToNumericResult(t, r, u, 16), this.emitNumericEntity(i, 3);
      }
      return this.addToNumericResult(t, r, u, 16), -1;
    }
    stateNumericDecimal(t, u) {
      let r = u;
      for (; u < t.length; ) {
        let i = t.charCodeAt(u);
        if (ma(i)) u += 1;
        else return this.addToNumericResult(t, r, u, 10), this.emitNumericEntity(i, 2);
      }
      return this.addToNumericResult(t, r, u, 10), -1;
    }
    emitNumericEntity(t, u) {
      var r;
      if (this.consumed <= u) return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      if (t === z.SEMI) this.consumed += 1;
      else if (this.decodeMode === ye.Strict) return 0;
      return this.emitCodePoint(ba(this.result), this.consumed), this.errors && (t !== z.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
    }
    stateNamedEntity(t, u) {
      let { decodeTree: r } = this, i = r[this.treeIndex], n = (i & Ve.VALUE_LENGTH) >> 14;
      for (; u < t.length; u++, this.excess++) {
        let s = t.charCodeAt(u);
        if (this.treeIndex = zc(r, i, this.treeIndex + Math.max(1, n), s), this.treeIndex < 0) return this.result === 0 || this.decodeMode === ye.Attribute && (n === 0 || jc(s)) ? 0 : this.emitNotTerminatedNamedEntity();
        if (i = r[this.treeIndex], n = (i & Ve.VALUE_LENGTH) >> 14, n !== 0) {
          if (s === z.SEMI) return this.emitNamedEntityData(this.treeIndex, n, this.consumed + this.excess);
          this.decodeMode !== ye.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
        }
      }
      return -1;
    }
    emitNotTerminatedNamedEntity() {
      var t;
      let { result: u, decodeTree: r } = this, i = (r[u] & Ve.VALUE_LENGTH) >> 14;
      return this.emitNamedEntityData(u, i, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
    }
    emitNamedEntityData(t, u, r) {
      let { decodeTree: i } = this;
      return this.emitCodePoint(u === 1 ? i[t] & ~Ve.VALUE_LENGTH : i[t + 1], r), u === 3 && this.emitCodePoint(i[t + 2], r), r;
    }
    end() {
      var t;
      switch (this.state) {
        case j.NamedEntity:
          return this.result !== 0 && (this.decodeMode !== ye.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        case j.NumericDecimal:
          return this.emitNumericEntity(0, 2);
        case j.NumericHex:
          return this.emitNumericEntity(0, 3);
        case j.NumericStart:
          return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
        case j.EntityStart:
          return 0;
      }
    }
  };
  function zc(e, t, u, r) {
    let i = (t & Ve.BRANCH_LENGTH) >> 7, n = t & Ve.JUMP_TABLE;
    if (i === 0) return n !== 0 && r === n ? u : -1;
    if (n) {
      let l = r - n;
      return l < 0 || l >= i ? -1 : e[u + l] - 1;
    }
    let s = u, A = s + i - 1;
    for (; s <= A; ) {
      let l = s + A >>> 1, f = e[l];
      if (f < r) s = l + 1;
      else if (f > r) A = l - 1;
      else return e[l + i];
    }
    return -1;
  }
  var Vt = {};
  Ae(Vt, { ATTRS: () => Be, DOCUMENT_MODE: () => re, NS: () => E, NUMBERED_HEADERS: () => It, SPECIAL_ELEMENTS: () => Ea, TAG_ID: () => a, TAG_NAMES: () => h, getTagID: () => Ze, hasUnescapedText: () => pa });
  var E;
  (function(e) {
    e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
  })(E || (E = {}));
  var Be;
  (function(e) {
    e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
  })(Be || (Be = {}));
  var re;
  (function(e) {
    e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
  })(re || (re = {}));
  var h;
  (function(e) {
    e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
  })(h || (h = {}));
  var a;
  (function(e) {
    e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
  })(a || (a = {}));
  var $c = /* @__PURE__ */ new Map([[h.A, a.A], [h.ADDRESS, a.ADDRESS], [h.ANNOTATION_XML, a.ANNOTATION_XML], [h.APPLET, a.APPLET], [h.AREA, a.AREA], [h.ARTICLE, a.ARTICLE], [h.ASIDE, a.ASIDE], [h.B, a.B], [h.BASE, a.BASE], [h.BASEFONT, a.BASEFONT], [h.BGSOUND, a.BGSOUND], [h.BIG, a.BIG], [h.BLOCKQUOTE, a.BLOCKQUOTE], [h.BODY, a.BODY], [h.BR, a.BR], [h.BUTTON, a.BUTTON], [h.CAPTION, a.CAPTION], [h.CENTER, a.CENTER], [h.CODE, a.CODE], [h.COL, a.COL], [h.COLGROUP, a.COLGROUP], [h.DD, a.DD], [h.DESC, a.DESC], [h.DETAILS, a.DETAILS], [h.DIALOG, a.DIALOG], [h.DIR, a.DIR], [h.DIV, a.DIV], [h.DL, a.DL], [h.DT, a.DT], [h.EM, a.EM], [h.EMBED, a.EMBED], [h.FIELDSET, a.FIELDSET], [h.FIGCAPTION, a.FIGCAPTION], [h.FIGURE, a.FIGURE], [h.FONT, a.FONT], [h.FOOTER, a.FOOTER], [h.FOREIGN_OBJECT, a.FOREIGN_OBJECT], [h.FORM, a.FORM], [h.FRAME, a.FRAME], [h.FRAMESET, a.FRAMESET], [h.H1, a.H1], [h.H2, a.H2], [h.H3, a.H3], [h.H4, a.H4], [h.H5, a.H5], [h.H6, a.H6], [h.HEAD, a.HEAD], [h.HEADER, a.HEADER], [h.HGROUP, a.HGROUP], [h.HR, a.HR], [h.HTML, a.HTML], [h.I, a.I], [h.IMG, a.IMG], [h.IMAGE, a.IMAGE], [h.INPUT, a.INPUT], [h.IFRAME, a.IFRAME], [h.KEYGEN, a.KEYGEN], [h.LABEL, a.LABEL], [h.LI, a.LI], [h.LINK, a.LINK], [h.LISTING, a.LISTING], [h.MAIN, a.MAIN], [h.MALIGNMARK, a.MALIGNMARK], [h.MARQUEE, a.MARQUEE], [h.MATH, a.MATH], [h.MENU, a.MENU], [h.META, a.META], [h.MGLYPH, a.MGLYPH], [h.MI, a.MI], [h.MO, a.MO], [h.MN, a.MN], [h.MS, a.MS], [h.MTEXT, a.MTEXT], [h.NAV, a.NAV], [h.NOBR, a.NOBR], [h.NOFRAMES, a.NOFRAMES], [h.NOEMBED, a.NOEMBED], [h.NOSCRIPT, a.NOSCRIPT], [h.OBJECT, a.OBJECT], [h.OL, a.OL], [h.OPTGROUP, a.OPTGROUP], [h.OPTION, a.OPTION], [h.P, a.P], [h.PARAM, a.PARAM], [h.PLAINTEXT, a.PLAINTEXT], [h.PRE, a.PRE], [h.RB, a.RB], [h.RP, a.RP], [h.RT, a.RT], [h.RTC, a.RTC], [h.RUBY, a.RUBY], [h.S, a.S], [h.SCRIPT, a.SCRIPT], [h.SEARCH, a.SEARCH], [h.SECTION, a.SECTION], [h.SELECT, a.SELECT], [h.SOURCE, a.SOURCE], [h.SMALL, a.SMALL], [h.SPAN, a.SPAN], [h.STRIKE, a.STRIKE], [h.STRONG, a.STRONG], [h.STYLE, a.STYLE], [h.SUB, a.SUB], [h.SUMMARY, a.SUMMARY], [h.SUP, a.SUP], [h.TABLE, a.TABLE], [h.TBODY, a.TBODY], [h.TEMPLATE, a.TEMPLATE], [h.TEXTAREA, a.TEXTAREA], [h.TFOOT, a.TFOOT], [h.TD, a.TD], [h.TH, a.TH], [h.THEAD, a.THEAD], [h.TITLE, a.TITLE], [h.TR, a.TR], [h.TRACK, a.TRACK], [h.TT, a.TT], [h.U, a.U], [h.UL, a.UL], [h.SVG, a.SVG], [h.VAR, a.VAR], [h.WBR, a.WBR], [h.XMP, a.XMP]]);
  function Ze(e) {
    var t;
    return (t = $c.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
  }
  var g = a, Ea = { [E.HTML]: /* @__PURE__ */ new Set([g.ADDRESS, g.APPLET, g.AREA, g.ARTICLE, g.ASIDE, g.BASE, g.BASEFONT, g.BGSOUND, g.BLOCKQUOTE, g.BODY, g.BR, g.BUTTON, g.CAPTION, g.CENTER, g.COL, g.COLGROUP, g.DD, g.DETAILS, g.DIR, g.DIV, g.DL, g.DT, g.EMBED, g.FIELDSET, g.FIGCAPTION, g.FIGURE, g.FOOTER, g.FORM, g.FRAME, g.FRAMESET, g.H1, g.H2, g.H3, g.H4, g.H5, g.H6, g.HEAD, g.HEADER, g.HGROUP, g.HR, g.HTML, g.IFRAME, g.IMG, g.INPUT, g.LI, g.LINK, g.LISTING, g.MAIN, g.MARQUEE, g.MENU, g.META, g.NAV, g.NOEMBED, g.NOFRAMES, g.NOSCRIPT, g.OBJECT, g.OL, g.P, g.PARAM, g.PLAINTEXT, g.PRE, g.SCRIPT, g.SECTION, g.SELECT, g.SOURCE, g.STYLE, g.SUMMARY, g.TABLE, g.TBODY, g.TD, g.TEMPLATE, g.TEXTAREA, g.TFOOT, g.TH, g.THEAD, g.TITLE, g.TR, g.TRACK, g.UL, g.WBR, g.XMP]), [E.MATHML]: /* @__PURE__ */ new Set([g.MI, g.MO, g.MN, g.MS, g.MTEXT, g.ANNOTATION_XML]), [E.SVG]: /* @__PURE__ */ new Set([g.TITLE, g.FOREIGN_OBJECT, g.DESC]), [E.XLINK]: /* @__PURE__ */ new Set(), [E.XML]: /* @__PURE__ */ new Set(), [E.XMLNS]: /* @__PURE__ */ new Set() }, It = /* @__PURE__ */ new Set([g.H1, g.H2, g.H3, g.H4, g.H5, g.H6]), eo = /* @__PURE__ */ new Set([h.STYLE, h.SCRIPT, h.XMP, h.IFRAME, h.NOEMBED, h.NOFRAMES, h.PLAINTEXT]);
  function pa(e, t) {
    return eo.has(e) || t && e === h.NOSCRIPT;
  }
  var o;
  (function(e) {
    e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
  })(o || (o = {}));
  var ae = { DATA: o.DATA, RCDATA: o.RCDATA, RAWTEXT: o.RAWTEXT, SCRIPT_DATA: o.SCRIPT_DATA, PLAINTEXT: o.PLAINTEXT, CDATA_SECTION: o.CDATA_SECTION };
  function to(e) {
    return e >= c.DIGIT_0 && e <= c.DIGIT_9;
  }
  function Zt(e) {
    return e >= c.LATIN_CAPITAL_A && e <= c.LATIN_CAPITAL_Z;
  }
  function uo(e) {
    return e >= c.LATIN_SMALL_A && e <= c.LATIN_SMALL_Z;
  }
  function Xe(e) {
    return uo(e) || Zt(e);
  }
  function $0(e) {
    return Xe(e) || to(e);
  }
  function Wu(e) {
    return e + 32;
  }
  function ti(e) {
    return e === c.SPACE || e === c.LINE_FEED || e === c.TABULATION || e === c.FORM_FEED;
  }
  function ei(e) {
    return ti(e) || e === c.SOLIDUS || e === c.GREATER_THAN_SIGN;
  }
  function ro(e) {
    return e === c.NULL ? b.nullCharacterReference : e > 1114111 ? b.characterReferenceOutsideUnicodeRange : Uu(e) ? b.surrogateCharacterReference : Qu(e) ? b.noncharacterCharacterReference : Hu(e) || e === c.CARRIAGE_RETURN ? b.controlCharacterReference : null;
  }
  var Xt = class {
    constructor(t, u) {
      this.options = t, this.handler = u, this.paused = false, this.inLoop = false, this.inForeignNode = false, this.lastStartTagName = "", this.active = false, this.state = o.DATA, this.returnState = o.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Yu(u), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Ku(Gu, (r, i) => {
        this.preprocessor.pos = this.entityStartPos + i - 1, this._flushCodePointConsumedAsCharacterReference(r);
      }, u.onParseError ? { missingSemicolonAfterCharacterReference: () => {
        this._err(b.missingSemicolonAfterCharacterReference, 1);
      }, absenceOfDigitsInNumericCharacterReference: (r) => {
        this._err(b.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + r);
      }, validateNumericCharacterReference: (r) => {
        let i = ro(r);
        i && this._err(i, 1);
      } } : void 0);
    }
    _err(t, u = 0) {
      var r, i;
      (i = (r = this.handler).onParseError) === null || i === void 0 || i.call(r, this.preprocessor.getError(t, u));
    }
    getCurrentLocation(t) {
      return this.options.sourceCodeLocationInfo ? { startLine: this.preprocessor.line, startCol: this.preprocessor.col - t, startOffset: this.preprocessor.offset - t, endLine: -1, endCol: -1, endOffset: -1 } : null;
    }
    _runParsingLoop() {
      if (!this.inLoop) {
        for (this.inLoop = true; this.active && !this.paused; ) {
          this.consumedAfterSnapshot = 0;
          let t = this._consume();
          this._ensureHibernation() || this._callState(t);
        }
        this.inLoop = false;
      }
    }
    pause() {
      this.paused = true;
    }
    resume(t) {
      if (!this.paused) throw new Error("Parser was already resumed");
      this.paused = false, !this.inLoop && (this._runParsingLoop(), this.paused || t == null || t());
    }
    write(t, u, r) {
      this.active = true, this.preprocessor.write(t, u), this._runParsingLoop(), this.paused || r == null || r();
    }
    insertHtmlAtCurrentPos(t) {
      this.active = true, this.preprocessor.insertHtmlAtCurrentPos(t), this._runParsingLoop();
    }
    _ensureHibernation() {
      return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = false, true) : false;
    }
    _consume() {
      return this.consumedAfterSnapshot++, this.preprocessor.advance();
    }
    _advanceBy(t) {
      this.consumedAfterSnapshot += t;
      for (let u = 0; u < t; u++) this.preprocessor.advance();
    }
    _consumeSequenceIfMatch(t, u) {
      return this.preprocessor.startsWith(t, u) ? (this._advanceBy(t.length - 1), true) : false;
    }
    _createStartTagToken() {
      this.currentToken = { type: B.START_TAG, tagName: "", tagID: a.UNKNOWN, selfClosing: false, ackSelfClosing: false, attrs: [], location: this.getCurrentLocation(1) };
    }
    _createEndTagToken() {
      this.currentToken = { type: B.END_TAG, tagName: "", tagID: a.UNKNOWN, selfClosing: false, ackSelfClosing: false, attrs: [], location: this.getCurrentLocation(2) };
    }
    _createCommentToken(t) {
      this.currentToken = { type: B.COMMENT, data: "", location: this.getCurrentLocation(t) };
    }
    _createDoctypeToken(t) {
      this.currentToken = { type: B.DOCTYPE, name: t, forceQuirks: false, publicId: null, systemId: null, location: this.currentLocation };
    }
    _createCharacterToken(t, u) {
      this.currentCharacterToken = { type: t, chars: u, location: this.currentLocation };
    }
    _createAttr(t) {
      this.currentAttr = { name: t, value: "" }, this.currentLocation = this.getCurrentLocation(0);
    }
    _leaveAttrName() {
      var t, u;
      let r = this.currentToken;
      if (qt(r, this.currentAttr.name) === null) {
        if (r.attrs.push(this.currentAttr), r.location && this.currentLocation) {
          let i = (t = (u = r.location).attrs) !== null && t !== void 0 ? t : u.attrs = /* @__PURE__ */ Object.create(null);
          i[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
        }
      } else this._err(b.duplicateAttribute);
    }
    _leaveAttrValue() {
      this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
    }
    prepareToken(t) {
      this._emitCurrentCharacterToken(t.location), this.currentToken = null, t.location && (t.location.endLine = this.preprocessor.line, t.location.endCol = this.preprocessor.col + 1, t.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
    }
    emitCurrentTagToken() {
      let t = this.currentToken;
      this.prepareToken(t), t.tagID = Ze(t.tagName), t.type === B.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(b.endTagWithAttributes), t.selfClosing && this._err(b.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(t) {
      this.prepareToken(t), this.handler.onComment(t), this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(t) {
      this.prepareToken(t), this.handler.onDoctype(t), this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(t) {
      if (this.currentCharacterToken) {
        switch (t && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = t.startLine, this.currentCharacterToken.location.endCol = t.startCol, this.currentCharacterToken.location.endOffset = t.startOffset), this.currentCharacterToken.type) {
          case B.CHARACTER: {
            this.handler.onCharacter(this.currentCharacterToken);
            break;
          }
          case B.NULL_CHARACTER: {
            this.handler.onNullCharacter(this.currentCharacterToken);
            break;
          }
          case B.WHITESPACE_CHARACTER: {
            this.handler.onWhitespaceCharacter(this.currentCharacterToken);
            break;
          }
        }
        this.currentCharacterToken = null;
      }
    }
    _emitEOFToken() {
      let t = this.getCurrentLocation(0);
      t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: B.EOF, location: t }), this.active = false;
    }
    _appendCharToCurrentCharacterToken(t, u) {
      if (this.currentCharacterToken) if (this.currentCharacterToken.type === t) {
        this.currentCharacterToken.chars += u;
        return;
      } else this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
      this._createCharacterToken(t, u);
    }
    _emitCodePoint(t) {
      let u = ti(t) ? B.WHITESPACE_CHARACTER : t === c.NULL ? B.NULL_CHARACTER : B.CHARACTER;
      this._appendCharToCurrentCharacterToken(u, String.fromCodePoint(t));
    }
    _emitChars(t) {
      this._appendCharToCurrentCharacterToken(B.CHARACTER, t);
    }
    _startCharacterReference() {
      this.returnState = this.state, this.state = o.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? ye.Attribute : ye.Legacy);
    }
    _isCharacterReferenceInAttribute() {
      return this.returnState === o.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_UNQUOTED;
    }
    _flushCodePointConsumedAsCharacterReference(t) {
      this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
    }
    _callState(t) {
      switch (this.state) {
        case o.DATA: {
          this._stateData(t);
          break;
        }
        case o.RCDATA: {
          this._stateRcdata(t);
          break;
        }
        case o.RAWTEXT: {
          this._stateRawtext(t);
          break;
        }
        case o.SCRIPT_DATA: {
          this._stateScriptData(t);
          break;
        }
        case o.PLAINTEXT: {
          this._statePlaintext(t);
          break;
        }
        case o.TAG_OPEN: {
          this._stateTagOpen(t);
          break;
        }
        case o.END_TAG_OPEN: {
          this._stateEndTagOpen(t);
          break;
        }
        case o.TAG_NAME: {
          this._stateTagName(t);
          break;
        }
        case o.RCDATA_LESS_THAN_SIGN: {
          this._stateRcdataLessThanSign(t);
          break;
        }
        case o.RCDATA_END_TAG_OPEN: {
          this._stateRcdataEndTagOpen(t);
          break;
        }
        case o.RCDATA_END_TAG_NAME: {
          this._stateRcdataEndTagName(t);
          break;
        }
        case o.RAWTEXT_LESS_THAN_SIGN: {
          this._stateRawtextLessThanSign(t);
          break;
        }
        case o.RAWTEXT_END_TAG_OPEN: {
          this._stateRawtextEndTagOpen(t);
          break;
        }
        case o.RAWTEXT_END_TAG_NAME: {
          this._stateRawtextEndTagName(t);
          break;
        }
        case o.SCRIPT_DATA_LESS_THAN_SIGN: {
          this._stateScriptDataLessThanSign(t);
          break;
        }
        case o.SCRIPT_DATA_END_TAG_OPEN: {
          this._stateScriptDataEndTagOpen(t);
          break;
        }
        case o.SCRIPT_DATA_END_TAG_NAME: {
          this._stateScriptDataEndTagName(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPE_START: {
          this._stateScriptDataEscapeStart(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPE_START_DASH: {
          this._stateScriptDataEscapeStartDash(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPED: {
          this._stateScriptDataEscaped(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPED_DASH: {
          this._stateScriptDataEscapedDash(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPED_DASH_DASH: {
          this._stateScriptDataEscapedDashDash(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataEscapedLessThanSign(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
          this._stateScriptDataEscapedEndTagOpen(t);
          break;
        }
        case o.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
          this._stateScriptDataEscapedEndTagName(t);
          break;
        }
        case o.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
          this._stateScriptDataDoubleEscapeStart(t);
          break;
        }
        case o.SCRIPT_DATA_DOUBLE_ESCAPED: {
          this._stateScriptDataDoubleEscaped(t);
          break;
        }
        case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
          this._stateScriptDataDoubleEscapedDash(t);
          break;
        }
        case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
          this._stateScriptDataDoubleEscapedDashDash(t);
          break;
        }
        case o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
          this._stateScriptDataDoubleEscapedLessThanSign(t);
          break;
        }
        case o.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
          this._stateScriptDataDoubleEscapeEnd(t);
          break;
        }
        case o.BEFORE_ATTRIBUTE_NAME: {
          this._stateBeforeAttributeName(t);
          break;
        }
        case o.ATTRIBUTE_NAME: {
          this._stateAttributeName(t);
          break;
        }
        case o.AFTER_ATTRIBUTE_NAME: {
          this._stateAfterAttributeName(t);
          break;
        }
        case o.BEFORE_ATTRIBUTE_VALUE: {
          this._stateBeforeAttributeValue(t);
          break;
        }
        case o.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
          this._stateAttributeValueDoubleQuoted(t);
          break;
        }
        case o.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
          this._stateAttributeValueSingleQuoted(t);
          break;
        }
        case o.ATTRIBUTE_VALUE_UNQUOTED: {
          this._stateAttributeValueUnquoted(t);
          break;
        }
        case o.AFTER_ATTRIBUTE_VALUE_QUOTED: {
          this._stateAfterAttributeValueQuoted(t);
          break;
        }
        case o.SELF_CLOSING_START_TAG: {
          this._stateSelfClosingStartTag(t);
          break;
        }
        case o.BOGUS_COMMENT: {
          this._stateBogusComment(t);
          break;
        }
        case o.MARKUP_DECLARATION_OPEN: {
          this._stateMarkupDeclarationOpen(t);
          break;
        }
        case o.COMMENT_START: {
          this._stateCommentStart(t);
          break;
        }
        case o.COMMENT_START_DASH: {
          this._stateCommentStartDash(t);
          break;
        }
        case o.COMMENT: {
          this._stateComment(t);
          break;
        }
        case o.COMMENT_LESS_THAN_SIGN: {
          this._stateCommentLessThanSign(t);
          break;
        }
        case o.COMMENT_LESS_THAN_SIGN_BANG: {
          this._stateCommentLessThanSignBang(t);
          break;
        }
        case o.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
          this._stateCommentLessThanSignBangDash(t);
          break;
        }
        case o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
          this._stateCommentLessThanSignBangDashDash(t);
          break;
        }
        case o.COMMENT_END_DASH: {
          this._stateCommentEndDash(t);
          break;
        }
        case o.COMMENT_END: {
          this._stateCommentEnd(t);
          break;
        }
        case o.COMMENT_END_BANG: {
          this._stateCommentEndBang(t);
          break;
        }
        case o.DOCTYPE: {
          this._stateDoctype(t);
          break;
        }
        case o.BEFORE_DOCTYPE_NAME: {
          this._stateBeforeDoctypeName(t);
          break;
        }
        case o.DOCTYPE_NAME: {
          this._stateDoctypeName(t);
          break;
        }
        case o.AFTER_DOCTYPE_NAME: {
          this._stateAfterDoctypeName(t);
          break;
        }
        case o.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
          this._stateAfterDoctypePublicKeyword(t);
          break;
        }
        case o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateBeforeDoctypePublicIdentifier(t);
          break;
        }
        case o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypePublicIdentifierDoubleQuoted(t);
          break;
        }
        case o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypePublicIdentifierSingleQuoted(t);
          break;
        }
        case o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
          this._stateAfterDoctypePublicIdentifier(t);
          break;
        }
        case o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
          this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
          break;
        }
        case o.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
          this._stateAfterDoctypeSystemKeyword(t);
          break;
        }
        case o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateBeforeDoctypeSystemIdentifier(t);
          break;
        }
        case o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
          this._stateDoctypeSystemIdentifierDoubleQuoted(t);
          break;
        }
        case o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
          this._stateDoctypeSystemIdentifierSingleQuoted(t);
          break;
        }
        case o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
          this._stateAfterDoctypeSystemIdentifier(t);
          break;
        }
        case o.BOGUS_DOCTYPE: {
          this._stateBogusDoctype(t);
          break;
        }
        case o.CDATA_SECTION: {
          this._stateCdataSection(t);
          break;
        }
        case o.CDATA_SECTION_BRACKET: {
          this._stateCdataSectionBracket(t);
          break;
        }
        case o.CDATA_SECTION_END: {
          this._stateCdataSectionEnd(t);
          break;
        }
        case o.CHARACTER_REFERENCE: {
          this._stateCharacterReference();
          break;
        }
        case o.AMBIGUOUS_AMPERSAND: {
          this._stateAmbiguousAmpersand(t);
          break;
        }
        default:
          throw new Error("Unknown state");
      }
    }
    _stateData(t) {
      switch (t) {
        case c.LESS_THAN_SIGN: {
          this.state = o.TAG_OPEN;
          break;
        }
        case c.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._emitCodePoint(t);
          break;
        }
        case c.EOF: {
          this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _stateRcdata(t) {
      switch (t) {
        case c.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case c.LESS_THAN_SIGN: {
          this.state = o.RCDATA_LESS_THAN_SIGN;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _stateRawtext(t) {
      switch (t) {
        case c.LESS_THAN_SIGN: {
          this.state = o.RAWTEXT_LESS_THAN_SIGN;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _stateScriptData(t) {
      switch (t) {
        case c.LESS_THAN_SIGN: {
          this.state = o.SCRIPT_DATA_LESS_THAN_SIGN;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _statePlaintext(t) {
      switch (t) {
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _stateTagOpen(t) {
      if (Xe(t)) this._createStartTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
      else switch (t) {
        case c.EXCLAMATION_MARK: {
          this.state = o.MARKUP_DECLARATION_OPEN;
          break;
        }
        case c.SOLIDUS: {
          this.state = o.END_TAG_OPEN;
          break;
        }
        case c.QUESTION_MARK: {
          this._err(b.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case c.EOF: {
          this._err(b.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = o.DATA, this._stateData(t);
      }
    }
    _stateEndTagOpen(t) {
      if (Xe(t)) this._createEndTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
      else switch (t) {
        case c.GREATER_THAN_SIGN: {
          this._err(b.missingEndTagName), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(b.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
      }
    }
    _stateTagName(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this.state = o.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case c.SOLIDUS: {
          this.state = o.SELF_CLOSING_START_TAG;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA, this.emitCurrentTagToken();
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.tagName += v;
          break;
        }
        case c.EOF: {
          this._err(b.eofInTag), this._emitEOFToken();
          break;
        }
        default:
          u.tagName += String.fromCodePoint(Zt(t) ? Wu(t) : t);
      }
    }
    _stateRcdataLessThanSign(t) {
      t === c.SOLIDUS ? this.state = o.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RCDATA, this._stateRcdata(t));
    }
    _stateRcdataEndTagOpen(t) {
      Xe(t) ? (this.state = o.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
    }
    handleSpecialEndTag(t) {
      if (!this.preprocessor.startsWith(this.lastStartTagName, false)) return !this._ensureHibernation();
      this._createEndTagToken();
      let u = this.currentToken;
      switch (u.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          return this._advanceBy(this.lastStartTagName.length), this.state = o.BEFORE_ATTRIBUTE_NAME, false;
        case c.SOLIDUS:
          return this._advanceBy(this.lastStartTagName.length), this.state = o.SELF_CLOSING_START_TAG, false;
        case c.GREATER_THAN_SIGN:
          return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = o.DATA, false;
        default:
          return !this._ensureHibernation();
      }
    }
    _stateRcdataEndTagName(t) {
      this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
    }
    _stateRawtextLessThanSign(t) {
      t === c.SOLIDUS ? this.state = o.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RAWTEXT, this._stateRawtext(t));
    }
    _stateRawtextEndTagOpen(t) {
      Xe(t) ? (this.state = o.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
    }
    _stateRawtextEndTagName(t) {
      this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
    }
    _stateScriptDataLessThanSign(t) {
      switch (t) {
        case c.SOLIDUS: {
          this.state = o.SCRIPT_DATA_END_TAG_OPEN;
          break;
        }
        case c.EXCLAMATION_MARK: {
          this.state = o.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
          break;
        }
        default:
          this._emitChars("<"), this.state = o.SCRIPT_DATA, this._stateScriptData(t);
      }
    }
    _stateScriptDataEndTagOpen(t) {
      Xe(t) ? (this.state = o.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
    }
    _stateScriptDataEndTagName(t) {
      this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
    }
    _stateScriptDataEscapeStart(t) {
      t === c.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
    }
    _stateScriptDataEscapeStartDash(t) {
      t === c.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
    }
    _stateScriptDataEscaped(t) {
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
          break;
        }
        case c.LESS_THAN_SIGN: {
          this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _stateScriptDataEscapedDash(t) {
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
          break;
        }
        case c.LESS_THAN_SIGN: {
          this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        }
        default:
          this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
      }
    }
    _stateScriptDataEscapedDashDash(t) {
      switch (t) {
        case c.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case c.LESS_THAN_SIGN: {
          this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this.state = o.SCRIPT_DATA, this._emitChars(">");
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        }
        default:
          this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
      }
    }
    _stateScriptDataEscapedLessThanSign(t) {
      t === c.SOLIDUS ? this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : Xe(t) ? (this._emitChars("<"), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
    }
    _stateScriptDataEscapedEndTagOpen(t) {
      Xe(t) ? (this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
    }
    _stateScriptDataEscapedEndTagName(t) {
      this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
    }
    _stateScriptDataDoubleEscapeStart(t) {
      if (this.preprocessor.startsWith(ne.SCRIPT, false) && ei(this.preprocessor.peek(ne.SCRIPT.length))) {
        this._emitCodePoint(t);
        for (let u = 0; u < ne.SCRIPT.length; u++) this._emitCodePoint(this._consume());
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED;
      } else this._ensureHibernation() || (this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
    }
    _stateScriptDataDoubleEscaped(t) {
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
          break;
        }
        case c.LESS_THAN_SIGN: {
          this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _stateScriptDataDoubleEscapedDash(t) {
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
          break;
        }
        case c.LESS_THAN_SIGN: {
          this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        }
        default:
          this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
      }
    }
    _stateScriptDataDoubleEscapedDashDash(t) {
      switch (t) {
        case c.HYPHEN_MINUS: {
          this._emitChars("-");
          break;
        }
        case c.LESS_THAN_SIGN: {
          this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this.state = o.SCRIPT_DATA, this._emitChars(">");
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(v);
          break;
        }
        case c.EOF: {
          this._err(b.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
          break;
        }
        default:
          this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
      }
    }
    _stateScriptDataDoubleEscapedLessThanSign(t) {
      t === c.SOLIDUS ? (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
    }
    _stateScriptDataDoubleEscapeEnd(t) {
      if (this.preprocessor.startsWith(ne.SCRIPT, false) && ei(this.preprocessor.peek(ne.SCRIPT.length))) {
        this._emitCodePoint(t);
        for (let u = 0; u < ne.SCRIPT.length; u++) this._emitCodePoint(this._consume());
        this.state = o.SCRIPT_DATA_ESCAPED;
      } else this._ensureHibernation() || (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
    }
    _stateBeforeAttributeName(t) {
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.SOLIDUS:
        case c.GREATER_THAN_SIGN:
        case c.EOF: {
          this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
          break;
        }
        case c.EQUALS_SIGN: {
          this._err(b.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = o.ATTRIBUTE_NAME;
          break;
        }
        default:
          this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
      }
    }
    _stateAttributeName(t) {
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
        case c.SOLIDUS:
        case c.GREATER_THAN_SIGN:
        case c.EOF: {
          this._leaveAttrName(), this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
          break;
        }
        case c.EQUALS_SIGN: {
          this._leaveAttrName(), this.state = o.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case c.QUOTATION_MARK:
        case c.APOSTROPHE:
        case c.LESS_THAN_SIGN: {
          this._err(b.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.currentAttr.name += v;
          break;
        }
        default:
          this.currentAttr.name += String.fromCodePoint(Zt(t) ? Wu(t) : t);
      }
    }
    _stateAfterAttributeName(t) {
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.SOLIDUS: {
          this.state = o.SELF_CLOSING_START_TAG;
          break;
        }
        case c.EQUALS_SIGN: {
          this.state = o.BEFORE_ATTRIBUTE_VALUE;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA, this.emitCurrentTagToken();
          break;
        }
        case c.EOF: {
          this._err(b.eofInTag), this._emitEOFToken();
          break;
        }
        default:
          this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
      }
    }
    _stateBeforeAttributeValue(t) {
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.QUOTATION_MARK: {
          this.state = o.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
          break;
        }
        case c.APOSTROPHE: {
          this.state = o.ATTRIBUTE_VALUE_SINGLE_QUOTED;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.missingAttributeValue), this.state = o.DATA, this.emitCurrentTagToken();
          break;
        }
        default:
          this.state = o.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
      }
    }
    _stateAttributeValueDoubleQuoted(t) {
      switch (t) {
        case c.QUOTATION_MARK: {
          this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case c.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.currentAttr.value += v;
          break;
        }
        case c.EOF: {
          this._err(b.eofInTag), this._emitEOFToken();
          break;
        }
        default:
          this.currentAttr.value += String.fromCodePoint(t);
      }
    }
    _stateAttributeValueSingleQuoted(t) {
      switch (t) {
        case c.APOSTROPHE: {
          this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
          break;
        }
        case c.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.currentAttr.value += v;
          break;
        }
        case c.EOF: {
          this._err(b.eofInTag), this._emitEOFToken();
          break;
        }
        default:
          this.currentAttr.value += String.fromCodePoint(t);
      }
    }
    _stateAttributeValueUnquoted(t) {
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case c.AMPERSAND: {
          this._startCharacterReference();
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this.currentAttr.value += v;
          break;
        }
        case c.QUOTATION_MARK:
        case c.APOSTROPHE:
        case c.LESS_THAN_SIGN:
        case c.EQUALS_SIGN:
        case c.GRAVE_ACCENT: {
          this._err(b.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
          break;
        }
        case c.EOF: {
          this._err(b.eofInTag), this._emitEOFToken();
          break;
        }
        default:
          this.currentAttr.value += String.fromCodePoint(t);
      }
    }
    _stateAfterAttributeValueQuoted(t) {
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
          break;
        }
        case c.SOLIDUS: {
          this._leaveAttrValue(), this.state = o.SELF_CLOSING_START_TAG;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
          break;
        }
        case c.EOF: {
          this._err(b.eofInTag), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingWhitespaceBetweenAttributes), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
      }
    }
    _stateSelfClosingStartTag(t) {
      switch (t) {
        case c.GREATER_THAN_SIGN: {
          let u = this.currentToken;
          u.selfClosing = true, this.state = o.DATA, this.emitCurrentTagToken();
          break;
        }
        case c.EOF: {
          this._err(b.eofInTag), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.unexpectedSolidusInTag), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
      }
    }
    _stateBogusComment(t) {
      let u = this.currentToken;
      switch (t) {
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA, this.emitCurrentComment(u);
          break;
        }
        case c.EOF: {
          this.emitCurrentComment(u), this._emitEOFToken();
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.data += v;
          break;
        }
        default:
          u.data += String.fromCodePoint(t);
      }
    }
    _stateMarkupDeclarationOpen(t) {
      this._consumeSequenceIfMatch(ne.DASH_DASH, true) ? (this._createCommentToken(ne.DASH_DASH.length + 1), this.state = o.COMMENT_START) : this._consumeSequenceIfMatch(ne.DOCTYPE, false) ? (this.currentLocation = this.getCurrentLocation(ne.DOCTYPE.length + 1), this.state = o.DOCTYPE) : this._consumeSequenceIfMatch(ne.CDATA_START, true) ? this.inForeignNode ? this.state = o.CDATA_SECTION : (this._err(b.cdataInHtmlContent), this._createCommentToken(ne.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = o.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(b.incorrectlyOpenedComment), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t));
    }
    _stateCommentStart(t) {
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.COMMENT_START_DASH;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.abruptClosingOfEmptyComment), this.state = o.DATA;
          let u = this.currentToken;
          this.emitCurrentComment(u);
          break;
        }
        default:
          this.state = o.COMMENT, this._stateComment(t);
      }
    }
    _stateCommentStartDash(t) {
      let u = this.currentToken;
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.COMMENT_END;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.abruptClosingOfEmptyComment), this.state = o.DATA, this.emitCurrentComment(u);
          break;
        }
        case c.EOF: {
          this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
          break;
        }
        default:
          u.data += "-", this.state = o.COMMENT, this._stateComment(t);
      }
    }
    _stateComment(t) {
      let u = this.currentToken;
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.COMMENT_END_DASH;
          break;
        }
        case c.LESS_THAN_SIGN: {
          u.data += "<", this.state = o.COMMENT_LESS_THAN_SIGN;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.data += v;
          break;
        }
        case c.EOF: {
          this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
          break;
        }
        default:
          u.data += String.fromCodePoint(t);
      }
    }
    _stateCommentLessThanSign(t) {
      let u = this.currentToken;
      switch (t) {
        case c.EXCLAMATION_MARK: {
          u.data += "!", this.state = o.COMMENT_LESS_THAN_SIGN_BANG;
          break;
        }
        case c.LESS_THAN_SIGN: {
          u.data += "<";
          break;
        }
        default:
          this.state = o.COMMENT, this._stateComment(t);
      }
    }
    _stateCommentLessThanSignBang(t) {
      t === c.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = o.COMMENT, this._stateComment(t));
    }
    _stateCommentLessThanSignBangDash(t) {
      t === c.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = o.COMMENT_END_DASH, this._stateCommentEndDash(t));
    }
    _stateCommentLessThanSignBangDashDash(t) {
      t !== c.GREATER_THAN_SIGN && t !== c.EOF && this._err(b.nestedComment), this.state = o.COMMENT_END, this._stateCommentEnd(t);
    }
    _stateCommentEndDash(t) {
      let u = this.currentToken;
      switch (t) {
        case c.HYPHEN_MINUS: {
          this.state = o.COMMENT_END;
          break;
        }
        case c.EOF: {
          this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
          break;
        }
        default:
          u.data += "-", this.state = o.COMMENT, this._stateComment(t);
      }
    }
    _stateCommentEnd(t) {
      let u = this.currentToken;
      switch (t) {
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA, this.emitCurrentComment(u);
          break;
        }
        case c.EXCLAMATION_MARK: {
          this.state = o.COMMENT_END_BANG;
          break;
        }
        case c.HYPHEN_MINUS: {
          u.data += "-";
          break;
        }
        case c.EOF: {
          this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
          break;
        }
        default:
          u.data += "--", this.state = o.COMMENT, this._stateComment(t);
      }
    }
    _stateCommentEndBang(t) {
      let u = this.currentToken;
      switch (t) {
        case c.HYPHEN_MINUS: {
          u.data += "--!", this.state = o.COMMENT_END_DASH;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.incorrectlyClosedComment), this.state = o.DATA, this.emitCurrentComment(u);
          break;
        }
        case c.EOF: {
          this._err(b.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
          break;
        }
        default:
          u.data += "--!", this.state = o.COMMENT, this._stateComment(t);
      }
    }
    _stateDoctype(t) {
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this.state = o.BEFORE_DOCTYPE_NAME;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), this._createDoctypeToken(null);
          let u = this.currentToken;
          u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingWhitespaceBeforeDoctypeName), this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
      }
    }
    _stateBeforeDoctypeName(t) {
      if (Zt(t)) this._createDoctypeToken(String.fromCharCode(Wu(t))), this.state = o.DOCTYPE_NAME;
      else switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), this._createDoctypeToken(v), this.state = o.DOCTYPE_NAME;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.missingDoctypeName), this._createDoctypeToken(null);
          let u = this.currentToken;
          u.forceQuirks = true, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), this._createDoctypeToken(null);
          let u = this.currentToken;
          u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = o.DOCTYPE_NAME;
      }
    }
    _stateDoctypeName(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this.state = o.AFTER_DOCTYPE_NAME;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA, this.emitCurrentDoctype(u);
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.name += v;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          u.name += String.fromCodePoint(Zt(t) ? Wu(t) : t);
      }
    }
    _stateAfterDoctypeName(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA, this.emitCurrentDoctype(u);
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._consumeSequenceIfMatch(ne.PUBLIC, false) ? this.state = o.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(ne.SYSTEM, false) ? this.state = o.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(b.invalidCharacterSequenceAfterDoctypeName), u.forceQuirks = true, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
      }
    }
    _stateAfterDoctypePublicKeyword(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this.state = o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case c.QUOTATION_MARK: {
          this._err(b.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case c.APOSTROPHE: {
          this._err(b.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.missingDoctypePublicIdentifier), u.forceQuirks = true, this.state = o.DATA, this.emitCurrentDoctype(u);
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = true, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
      }
    }
    _stateBeforeDoctypePublicIdentifier(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.QUOTATION_MARK: {
          u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case c.APOSTROPHE: {
          u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.missingDoctypePublicIdentifier), u.forceQuirks = true, this.state = o.DATA, this.emitCurrentDoctype(u);
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = true, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
      }
    }
    _stateDoctypePublicIdentifierDoubleQuoted(t) {
      let u = this.currentToken;
      switch (t) {
        case c.QUOTATION_MARK: {
          this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.publicId += v;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.abruptDoctypePublicIdentifier), u.forceQuirks = true, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          u.publicId += String.fromCodePoint(t);
      }
    }
    _stateDoctypePublicIdentifierSingleQuoted(t) {
      let u = this.currentToken;
      switch (t) {
        case c.APOSTROPHE: {
          this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.publicId += v;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.abruptDoctypePublicIdentifier), u.forceQuirks = true, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          u.publicId += String.fromCodePoint(t);
      }
    }
    _stateAfterDoctypePublicIdentifier(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this.state = o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA, this.emitCurrentDoctype(u);
          break;
        }
        case c.QUOTATION_MARK: {
          this._err(b.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case c.APOSTROPHE: {
          this._err(b.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = true, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
      }
    }
    _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.QUOTATION_MARK: {
          u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case c.APOSTROPHE: {
          u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = true, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
      }
    }
    _stateAfterDoctypeSystemKeyword(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED: {
          this.state = o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case c.QUOTATION_MARK: {
          this._err(b.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case c.APOSTROPHE: {
          this._err(b.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.missingDoctypeSystemIdentifier), u.forceQuirks = true, this.state = o.DATA, this.emitCurrentDoctype(u);
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = true, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
      }
    }
    _stateBeforeDoctypeSystemIdentifier(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.QUOTATION_MARK: {
          u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
          break;
        }
        case c.APOSTROPHE: {
          u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.missingDoctypeSystemIdentifier), u.forceQuirks = true, this.state = o.DATA, this.emitCurrentDoctype(u);
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = true, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
      }
    }
    _stateDoctypeSystemIdentifierDoubleQuoted(t) {
      let u = this.currentToken;
      switch (t) {
        case c.QUOTATION_MARK: {
          this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.systemId += v;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.abruptDoctypeSystemIdentifier), u.forceQuirks = true, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          u.systemId += String.fromCodePoint(t);
      }
    }
    _stateDoctypeSystemIdentifierSingleQuoted(t) {
      let u = this.currentToken;
      switch (t) {
        case c.APOSTROPHE: {
          this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter), u.systemId += v;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(b.abruptDoctypeSystemIdentifier), u.forceQuirks = true, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          u.systemId += String.fromCodePoint(t);
      }
    }
    _stateAfterDoctypeSystemIdentifier(t) {
      let u = this.currentToken;
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(b.eofInDoctype), u.forceQuirks = true, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._err(b.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
      }
    }
    _stateBogusDoctype(t) {
      let u = this.currentToken;
      switch (t) {
        case c.GREATER_THAN_SIGN: {
          this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.NULL: {
          this._err(b.unexpectedNullCharacter);
          break;
        }
        case c.EOF: {
          this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
      }
    }
    _stateCdataSection(t) {
      switch (t) {
        case c.RIGHT_SQUARE_BRACKET: {
          this.state = o.CDATA_SECTION_BRACKET;
          break;
        }
        case c.EOF: {
          this._err(b.eofInCdata), this._emitEOFToken();
          break;
        }
        default:
          this._emitCodePoint(t);
      }
    }
    _stateCdataSectionBracket(t) {
      t === c.RIGHT_SQUARE_BRACKET ? this.state = o.CDATA_SECTION_END : (this._emitChars("]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t));
    }
    _stateCdataSectionEnd(t) {
      switch (t) {
        case c.GREATER_THAN_SIGN: {
          this.state = o.DATA;
          break;
        }
        case c.RIGHT_SQUARE_BRACKET: {
          this._emitChars("]");
          break;
        }
        default:
          this._emitChars("]]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t);
      }
    }
    _stateCharacterReference() {
      let t = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
      if (t < 0) if (this.preprocessor.lastChunkWritten) t = this.entityDecoder.end();
      else {
        this.active = false, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = true;
        return;
      }
      t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(c.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && $0(this.preprocessor.peek(1)) ? o.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
    }
    _stateAmbiguousAmpersand(t) {
      $0(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === c.SEMICOLON && this._err(b.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
    }
  };
  var ii = /* @__PURE__ */ new Set([a.DD, a.DT, a.LI, a.OPTGROUP, a.OPTION, a.P, a.RB, a.RP, a.RT, a.RTC]), ui = /* @__PURE__ */ new Set([...ii, a.CAPTION, a.COLGROUP, a.TBODY, a.TD, a.TFOOT, a.TH, a.THEAD, a.TR]), Ju = /* @__PURE__ */ new Set([a.APPLET, a.CAPTION, a.HTML, a.MARQUEE, a.OBJECT, a.TABLE, a.TD, a.TEMPLATE, a.TH]), ao = /* @__PURE__ */ new Set([...Ju, a.OL, a.UL]), io = /* @__PURE__ */ new Set([...Ju, a.BUTTON]), ri = /* @__PURE__ */ new Set([a.ANNOTATION_XML, a.MI, a.MN, a.MO, a.MS, a.MTEXT]), ai = /* @__PURE__ */ new Set([a.DESC, a.FOREIGN_OBJECT, a.TITLE]), no = /* @__PURE__ */ new Set([a.TR, a.TEMPLATE, a.HTML]), so = /* @__PURE__ */ new Set([a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML]), co = /* @__PURE__ */ new Set([a.TABLE, a.TEMPLATE, a.HTML]), oo = /* @__PURE__ */ new Set([a.TD, a.TH]), qu = class {
    get currentTmplContentOrNode() {
      return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
    }
    constructor(t, u, r) {
      this.treeAdapter = u, this.handler = r, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = a.UNKNOWN, this.current = t;
    }
    _indexOf(t) {
      return this.items.lastIndexOf(t, this.stackTop);
    }
    _isInTemplate() {
      return this.currentTagId === a.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === E.HTML;
    }
    _updateCurrentElement() {
      this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
    }
    push(t, u) {
      this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = u, this.currentTagId = u, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, u, true);
    }
    pop() {
      let t = this.current;
      this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, true);
    }
    replace(t, u) {
      let r = this._indexOf(t);
      this.items[r] = u, r === this.stackTop && (this.current = u);
    }
    insertAfter(t, u, r) {
      let i = this._indexOf(t) + 1;
      this.items.splice(i, 0, u), this.tagIDs.splice(i, 0, r), this.stackTop++, i === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, i === this.stackTop);
    }
    popUntilTagNamePopped(t) {
      let u = this.stackTop + 1;
      do
        u = this.tagIDs.lastIndexOf(t, u - 1);
      while (u > 0 && this.treeAdapter.getNamespaceURI(this.items[u]) !== E.HTML);
      this.shortenToLength(Math.max(u, 0));
    }
    shortenToLength(t) {
      for (; this.stackTop >= t; ) {
        let u = this.current;
        this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(u, this.stackTop < t);
      }
    }
    popUntilElementPopped(t) {
      let u = this._indexOf(t);
      this.shortenToLength(Math.max(u, 0));
    }
    popUntilPopped(t, u) {
      let r = this._indexOfTagNames(t, u);
      this.shortenToLength(Math.max(r, 0));
    }
    popUntilNumberedHeaderPopped() {
      this.popUntilPopped(It, E.HTML);
    }
    popUntilTableCellPopped() {
      this.popUntilPopped(oo, E.HTML);
    }
    popAllUpToHtmlElement() {
      this.tmplCount = 0, this.shortenToLength(1);
    }
    _indexOfTagNames(t, u) {
      for (let r = this.stackTop; r >= 0; r--) if (t.has(this.tagIDs[r]) && this.treeAdapter.getNamespaceURI(this.items[r]) === u) return r;
      return -1;
    }
    clearBackTo(t, u) {
      let r = this._indexOfTagNames(t, u);
      this.shortenToLength(r + 1);
    }
    clearBackToTableContext() {
      this.clearBackTo(co, E.HTML);
    }
    clearBackToTableBodyContext() {
      this.clearBackTo(so, E.HTML);
    }
    clearBackToTableRowContext() {
      this.clearBackTo(no, E.HTML);
    }
    remove(t) {
      let u = this._indexOf(t);
      u >= 0 && (u === this.stackTop ? this.pop() : (this.items.splice(u, 1), this.tagIDs.splice(u, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, false)));
    }
    tryPeekProperlyNestedBodyElement() {
      return this.stackTop >= 1 && this.tagIDs[1] === a.BODY ? this.items[1] : null;
    }
    contains(t) {
      return this._indexOf(t) > -1;
    }
    getCommonAncestor(t) {
      let u = this._indexOf(t) - 1;
      return u >= 0 ? this.items[u] : null;
    }
    isRootHtmlElementCurrent() {
      return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
    }
    hasInDynamicScope(t, u) {
      for (let r = this.stackTop; r >= 0; r--) {
        let i = this.tagIDs[r];
        switch (this.treeAdapter.getNamespaceURI(this.items[r])) {
          case E.HTML: {
            if (i === t) return true;
            if (u.has(i)) return false;
            break;
          }
          case E.SVG: {
            if (ai.has(i)) return false;
            break;
          }
          case E.MATHML: {
            if (ri.has(i)) return false;
            break;
          }
        }
      }
      return true;
    }
    hasInScope(t) {
      return this.hasInDynamicScope(t, Ju);
    }
    hasInListItemScope(t) {
      return this.hasInDynamicScope(t, ao);
    }
    hasInButtonScope(t) {
      return this.hasInDynamicScope(t, io);
    }
    hasNumberedHeaderInScope() {
      for (let t = this.stackTop; t >= 0; t--) {
        let u = this.tagIDs[t];
        switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
          case E.HTML: {
            if (It.has(u)) return true;
            if (Ju.has(u)) return false;
            break;
          }
          case E.SVG: {
            if (ai.has(u)) return false;
            break;
          }
          case E.MATHML: {
            if (ri.has(u)) return false;
            break;
          }
        }
      }
      return true;
    }
    hasInTableScope(t) {
      for (let u = this.stackTop; u >= 0; u--) if (this.treeAdapter.getNamespaceURI(this.items[u]) === E.HTML) switch (this.tagIDs[u]) {
        case t:
          return true;
        case a.TABLE:
        case a.HTML:
          return false;
      }
      return true;
    }
    hasTableBodyContextInTableScope() {
      for (let t = this.stackTop; t >= 0; t--) if (this.treeAdapter.getNamespaceURI(this.items[t]) === E.HTML) switch (this.tagIDs[t]) {
        case a.TBODY:
        case a.THEAD:
        case a.TFOOT:
          return true;
        case a.TABLE:
        case a.HTML:
          return false;
      }
      return true;
    }
    hasInSelectScope(t) {
      for (let u = this.stackTop; u >= 0; u--) if (this.treeAdapter.getNamespaceURI(this.items[u]) === E.HTML) switch (this.tagIDs[u]) {
        case t:
          return true;
        case a.OPTION:
        case a.OPTGROUP:
          break;
        default:
          return false;
      }
      return true;
    }
    generateImpliedEndTags() {
      for (; this.currentTagId !== void 0 && ii.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsThoroughly() {
      for (; this.currentTagId !== void 0 && ui.has(this.currentTagId); ) this.pop();
    }
    generateImpliedEndTagsWithExclusion(t) {
      for (; this.currentTagId !== void 0 && this.currentTagId !== t && ui.has(this.currentTagId); ) this.pop();
    }
  };
  var Ne;
  (function(e) {
    e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
  })(Ne || (Ne = {}));
  var ni = { type: Ne.Marker }, Vu = class {
    constructor(t) {
      this.treeAdapter = t, this.entries = [], this.bookmark = null;
    }
    _getNoahArkConditionCandidates(t, u) {
      let r = [], i = u.length, n = this.treeAdapter.getTagName(t), s = this.treeAdapter.getNamespaceURI(t);
      for (let A = 0; A < this.entries.length; A++) {
        let l = this.entries[A];
        if (l.type === Ne.Marker) break;
        let { element: f } = l;
        if (this.treeAdapter.getTagName(f) === n && this.treeAdapter.getNamespaceURI(f) === s) {
          let m = this.treeAdapter.getAttrList(f);
          m.length === i && r.push({ idx: A, attrs: m });
        }
      }
      return r;
    }
    _ensureNoahArkCondition(t) {
      if (this.entries.length < 3) return;
      let u = this.treeAdapter.getAttrList(t), r = this._getNoahArkConditionCandidates(t, u);
      if (r.length < 3) return;
      let i = new Map(u.map((s) => [s.name, s.value])), n = 0;
      for (let s = 0; s < r.length; s++) {
        let A = r[s];
        A.attrs.every((l) => i.get(l.name) === l.value) && (n += 1, n >= 3 && this.entries.splice(A.idx, 1));
      }
    }
    insertMarker() {
      this.entries.unshift(ni);
    }
    pushElement(t, u) {
      this._ensureNoahArkCondition(t), this.entries.unshift({ type: Ne.Element, element: t, token: u });
    }
    insertElementAfterBookmark(t, u) {
      let r = this.entries.indexOf(this.bookmark);
      this.entries.splice(r, 0, { type: Ne.Element, element: t, token: u });
    }
    removeEntry(t) {
      let u = this.entries.indexOf(t);
      u !== -1 && this.entries.splice(u, 1);
    }
    clearToLastMarker() {
      let t = this.entries.indexOf(ni);
      t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
    }
    getElementEntryInScopeWithTagName(t) {
      let u = this.entries.find((r) => r.type === Ne.Marker || this.treeAdapter.getTagName(r.element) === t);
      return u && u.type === Ne.Element ? u : null;
    }
    getElementEntry(t) {
      return this.entries.find((u) => u.type === Ne.Element && u.element === t);
    }
  };
  var Ie = { createDocument() {
    return { nodeName: "#document", mode: re.NO_QUIRKS, childNodes: [] };
  }, createDocumentFragment() {
    return { nodeName: "#document-fragment", childNodes: [] };
  }, createElement(e, t, u) {
    return { nodeName: e, tagName: e, attrs: u, namespaceURI: t, childNodes: [], parentNode: null };
  }, createCommentNode(e) {
    return { nodeName: "#comment", data: e, parentNode: null };
  }, createTextNode(e) {
    return { nodeName: "#text", value: e, parentNode: null };
  }, appendChild(e, t) {
    e.childNodes.push(t), t.parentNode = e;
  }, insertBefore(e, t, u) {
    let r = e.childNodes.indexOf(u);
    e.childNodes.splice(r, 0, t), t.parentNode = e;
  }, setTemplateContent(e, t) {
    e.content = t;
  }, getTemplateContent(e) {
    return e.content;
  }, setDocumentType(e, t, u, r) {
    let i = e.childNodes.find((n) => n.nodeName === "#documentType");
    if (i) i.name = t, i.publicId = u, i.systemId = r;
    else {
      let n = { nodeName: "#documentType", name: t, publicId: u, systemId: r, parentNode: null };
      Ie.appendChild(e, n);
    }
  }, setDocumentMode(e, t) {
    e.mode = t;
  }, getDocumentMode(e) {
    return e.mode;
  }, detachNode(e) {
    if (e.parentNode) {
      let t = e.parentNode.childNodes.indexOf(e);
      e.parentNode.childNodes.splice(t, 1), e.parentNode = null;
    }
  }, insertText(e, t) {
    if (e.childNodes.length > 0) {
      let u = e.childNodes[e.childNodes.length - 1];
      if (Ie.isTextNode(u)) {
        u.value += t;
        return;
      }
    }
    Ie.appendChild(e, Ie.createTextNode(t));
  }, insertTextBefore(e, t, u) {
    let r = e.childNodes[e.childNodes.indexOf(u) - 1];
    r && Ie.isTextNode(r) ? r.value += t : Ie.insertBefore(e, Ie.createTextNode(t), u);
  }, adoptAttributes(e, t) {
    let u = new Set(e.attrs.map((r) => r.name));
    for (let r = 0; r < t.length; r++) u.has(t[r].name) || e.attrs.push(t[r]);
  }, getFirstChild(e) {
    return e.childNodes[0];
  }, getChildNodes(e) {
    return e.childNodes;
  }, getParentNode(e) {
    return e.parentNode;
  }, getAttrList(e) {
    return e.attrs;
  }, getTagName(e) {
    return e.tagName;
  }, getNamespaceURI(e) {
    return e.namespaceURI;
  }, getTextNodeContent(e) {
    return e.value;
  }, getCommentNodeContent(e) {
    return e.data;
  }, getDocumentTypeNodeName(e) {
    return e.name;
  }, getDocumentTypeNodePublicId(e) {
    return e.publicId;
  }, getDocumentTypeNodeSystemId(e) {
    return e.systemId;
  }, isTextNode(e) {
    return e.nodeName === "#text";
  }, isCommentNode(e) {
    return e.nodeName === "#comment";
  }, isDocumentTypeNode(e) {
    return e.nodeName === "#documentType";
  }, isElementNode(e) {
    return Object.prototype.hasOwnProperty.call(e, "tagName");
  }, setNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = t;
  }, getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  }, updateNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = L(L({}, e.sourceCodeLocation), t);
  } };
  var ci = "html", Ao = "about:legacy-compat", lo = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", oi = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"], fo = [...oi, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"], ho = /* @__PURE__ */ new Set(["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"]), Ai = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], bo = [...Ai, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"];
  function si(e, t) {
    return t.some((u) => e.startsWith(u));
  }
  function di(e) {
    return e.name === ci && e.publicId === null && (e.systemId === null || e.systemId === Ao);
  }
  function li(e) {
    if (e.name !== ci) return re.QUIRKS;
    let { systemId: t } = e;
    if (t && t.toLowerCase() === lo) return re.QUIRKS;
    let { publicId: u } = e;
    if (u !== null) {
      if (u = u.toLowerCase(), ho.has(u)) return re.QUIRKS;
      let r = t === null ? fo : oi;
      if (si(u, r)) return re.QUIRKS;
      if (r = t === null ? Ai : bo, si(u, r)) return re.LIMITED_QUIRKS;
    }
    return re.NO_QUIRKS;
  }
  var ju = {};
  Ae(ju, { SVG_TAG_NAMES_ADJUSTMENT_MAP: () => hi, adjustTokenMathMLAttrs: () => Zu, adjustTokenSVGAttrs: () => Xu, adjustTokenSVGTagName: () => Ta, adjustTokenXMLAttrs: () => jt, causesExit: () => ga, isIntegrationPoint: () => Ia });
  var fi = { TEXT_HTML: "text/html", APPLICATION_XML: "application/xhtml+xml" }, Eo = "definitionurl", po = "definitionURL", go = new Map(["attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map((e) => [e.toLowerCase(), e])), To = /* @__PURE__ */ new Map([["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: E.XLINK }], ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: E.XLINK }], ["xlink:href", { prefix: "xlink", name: "href", namespace: E.XLINK }], ["xlink:role", { prefix: "xlink", name: "role", namespace: E.XLINK }], ["xlink:show", { prefix: "xlink", name: "show", namespace: E.XLINK }], ["xlink:title", { prefix: "xlink", name: "title", namespace: E.XLINK }], ["xlink:type", { prefix: "xlink", name: "type", namespace: E.XLINK }], ["xml:lang", { prefix: "xml", name: "lang", namespace: E.XML }], ["xml:space", { prefix: "xml", name: "space", namespace: E.XML }], ["xmlns", { prefix: "", name: "xmlns", namespace: E.XMLNS }], ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: E.XMLNS }]]), hi = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map((e) => [e.toLowerCase(), e])), Io = /* @__PURE__ */ new Set([a.B, a.BIG, a.BLOCKQUOTE, a.BODY, a.BR, a.CENTER, a.CODE, a.DD, a.DIV, a.DL, a.DT, a.EM, a.EMBED, a.H1, a.H2, a.H3, a.H4, a.H5, a.H6, a.HEAD, a.HR, a.I, a.IMG, a.LI, a.LISTING, a.MENU, a.META, a.NOBR, a.OL, a.P, a.PRE, a.RUBY, a.S, a.SMALL, a.SPAN, a.STRONG, a.STRIKE, a.SUB, a.SUP, a.TABLE, a.TT, a.U, a.UL, a.VAR]);
  function ga(e) {
    let t = e.tagID;
    return t === a.FONT && e.attrs.some(({ name: r }) => r === Be.COLOR || r === Be.SIZE || r === Be.FACE) || Io.has(t);
  }
  function Zu(e) {
    for (let t = 0; t < e.attrs.length; t++) if (e.attrs[t].name === Eo) {
      e.attrs[t].name = po;
      break;
    }
  }
  function Xu(e) {
    for (let t = 0; t < e.attrs.length; t++) {
      let u = go.get(e.attrs[t].name);
      u != null && (e.attrs[t].name = u);
    }
  }
  function jt(e) {
    for (let t = 0; t < e.attrs.length; t++) {
      let u = To.get(e.attrs[t].name);
      u && (e.attrs[t].prefix = u.prefix, e.attrs[t].name = u.name, e.attrs[t].namespace = u.namespace);
    }
  }
  function Ta(e) {
    let t = hi.get(e.tagName);
    t != null && (e.tagName = t, e.tagID = Ze(e.tagName));
  }
  function Co(e, t) {
    return t === E.MATHML && (e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT);
  }
  function _o(e, t, u) {
    if (t === E.MATHML && e === a.ANNOTATION_XML) {
      for (let r = 0; r < u.length; r++) if (u[r].name === Be.ENCODING) {
        let i = u[r].value.toLowerCase();
        return i === fi.TEXT_HTML || i === fi.APPLICATION_XML;
      }
    }
    return t === E.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE);
  }
  function Ia(e, t, u, r) {
    return (!r || r === E.HTML) && _o(e, t, u) || (!r || r === E.MATHML) && Co(e, t);
  }
  var xo = "hidden", No = 8, So = 3, d;
  (function(e) {
    e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
  })(d || (d = {}));
  var Do = { startLine: -1, startCol: -1, startOffset: -1, endLine: -1, endCol: -1, endOffset: -1 }, pi = /* @__PURE__ */ new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]), bi = { scriptingEnabled: true, sourceCodeLocationInfo: false, treeAdapter: Ie, onParseError: null }, Ct = class {
    constructor(t, u, r = null, i = null) {
      this.fragmentContext = r, this.scriptHandler = i, this.currentToken = null, this.stopped = false, this.insertionMode = d.INITIAL, this.originalInsertionMode = d.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = false, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = false, this.framesetOk = true, this.skipNextNewLine = false, this.fosterParentingEnabled = false, this.options = L(L({}, bi), t), this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = true), this.document = u != null ? u : this.treeAdapter.createDocument(), this.tokenizer = new Xt(this.options, this), this.activeFormattingElements = new Vu(this.treeAdapter), this.fragmentContextID = r ? Ze(this.treeAdapter.getTagName(r)) : a.UNKNOWN, this._setContextModes(r != null ? r : this.document, this.fragmentContextID), this.openElements = new qu(this.document, this.treeAdapter, this);
    }
    static parse(t, u) {
      let r = new this(u);
      return r.tokenizer.write(t, true), r.document;
    }
    static getFragmentParser(t, u) {
      let r = L(L({}, bi), u);
      t != null || (t = r.treeAdapter.createElement(h.TEMPLATE, E.HTML, []));
      let i = r.treeAdapter.createElement("documentmock", E.HTML, []), n = new this(r, i, t);
      return n.fragmentContextID === a.TEMPLATE && n.tmplInsertionModeStack.unshift(d.IN_TEMPLATE), n._initTokenizerForFragmentParsing(), n._insertFakeRootElement(), n._resetInsertionMode(), n._findFormInFragmentContext(), n;
    }
    getFragment() {
      let t = this.treeAdapter.getFirstChild(this.document), u = this.treeAdapter.createDocumentFragment();
      return this._adoptNodes(t, u), u;
    }
    _err(t, u, r) {
      var i;
      if (!this.onParseError) return;
      let n = (i = t.location) !== null && i !== void 0 ? i : Do, s = { code: u, startLine: n.startLine, startCol: n.startCol, startOffset: n.startOffset, endLine: r ? n.startLine : n.endLine, endCol: r ? n.startCol : n.endCol, endOffset: r ? n.startOffset : n.endOffset };
      this.onParseError(s);
    }
    onItemPush(t, u, r) {
      var i, n;
      (n = (i = this.treeAdapter).onItemPush) === null || n === void 0 || n.call(i, t), r && this.openElements.stackTop > 0 && this._setContextModes(t, u);
    }
    onItemPop(t, u) {
      var r, i;
      if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (i = (r = this.treeAdapter).onItemPop) === null || i === void 0 || i.call(r, t, this.openElements.current), u) {
        let n, s;
        this.openElements.stackTop === 0 && this.fragmentContext ? (n = this.fragmentContext, s = this.fragmentContextID) : { current: n, currentTagId: s } = this.openElements, this._setContextModes(n, s);
      }
    }
    _setContextModes(t, u) {
      let r = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === E.HTML;
      this.currentNotInHTML = !r, this.tokenizer.inForeignNode = !r && t !== void 0 && u !== void 0 && !this._isIntegrationPoint(u, t);
    }
    _switchToTextParsing(t, u) {
      this._insertElement(t, E.HTML), this.tokenizer.state = u, this.originalInsertionMode = this.insertionMode, this.insertionMode = d.TEXT;
    }
    switchToPlaintextParsing() {
      this.insertionMode = d.TEXT, this.originalInsertionMode = d.IN_BODY, this.tokenizer.state = ae.PLAINTEXT;
    }
    _getAdjustedCurrentElement() {
      return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
    }
    _findFormInFragmentContext() {
      let t = this.fragmentContext;
      for (; t; ) {
        if (this.treeAdapter.getTagName(t) === h.FORM) {
          this.formElement = t;
          break;
        }
        t = this.treeAdapter.getParentNode(t);
      }
    }
    _initTokenizerForFragmentParsing() {
      if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== E.HTML)) switch (this.fragmentContextID) {
        case a.TITLE:
        case a.TEXTAREA: {
          this.tokenizer.state = ae.RCDATA;
          break;
        }
        case a.STYLE:
        case a.XMP:
        case a.IFRAME:
        case a.NOEMBED:
        case a.NOFRAMES:
        case a.NOSCRIPT: {
          this.tokenizer.state = ae.RAWTEXT;
          break;
        }
        case a.SCRIPT: {
          this.tokenizer.state = ae.SCRIPT_DATA;
          break;
        }
        case a.PLAINTEXT: {
          this.tokenizer.state = ae.PLAINTEXT;
          break;
        }
        default:
      }
    }
    _setDocumentType(t) {
      let u = t.name || "", r = t.publicId || "", i = t.systemId || "";
      if (this.treeAdapter.setDocumentType(this.document, u, r, i), t.location) {
        let s = this.treeAdapter.getChildNodes(this.document).find((A) => this.treeAdapter.isDocumentTypeNode(A));
        s && this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
      }
    }
    _attachElementToTree(t, u) {
      if (this.options.sourceCodeLocationInfo) {
        let r = u && _e(L({}, u), { startTag: u });
        this.treeAdapter.setNodeSourceCodeLocation(t, r);
      }
      if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(t);
      else {
        let r = this.openElements.currentTmplContentOrNode;
        this.treeAdapter.appendChild(r != null ? r : this.document, t);
      }
    }
    _appendElement(t, u) {
      let r = this.treeAdapter.createElement(t.tagName, u, t.attrs);
      this._attachElementToTree(r, t.location);
    }
    _insertElement(t, u) {
      let r = this.treeAdapter.createElement(t.tagName, u, t.attrs);
      this._attachElementToTree(r, t.location), this.openElements.push(r, t.tagID);
    }
    _insertFakeElement(t, u) {
      let r = this.treeAdapter.createElement(t, E.HTML, []);
      this._attachElementToTree(r, null), this.openElements.push(r, u);
    }
    _insertTemplate(t) {
      let u = this.treeAdapter.createElement(t.tagName, E.HTML, t.attrs), r = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(u, r), this._attachElementToTree(u, t.location), this.openElements.push(u, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, null);
    }
    _insertFakeRootElement() {
      let t = this.treeAdapter.createElement(h.HTML, E.HTML, []);
      this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, a.HTML);
    }
    _appendCommentNode(t, u) {
      let r = this.treeAdapter.createCommentNode(t.data);
      this.treeAdapter.appendChild(u, r), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, t.location);
    }
    _insertCharacters(t) {
      let u, r;
      if (this._shouldFosterParentOnInsertion() ? ({ parent: u, beforeElement: r } = this._findFosterParentingLocation(), r ? this.treeAdapter.insertTextBefore(u, t.chars, r) : this.treeAdapter.insertText(u, t.chars)) : (u = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(u, t.chars)), !t.location) return;
      let i = this.treeAdapter.getChildNodes(u), n = r ? i.lastIndexOf(r) : i.length, s = i[n - 1];
      if (this.treeAdapter.getNodeSourceCodeLocation(s)) {
        let { endLine: l, endCol: f, endOffset: m } = t.location;
        this.treeAdapter.updateNodeSourceCodeLocation(s, { endLine: l, endCol: f, endOffset: m });
      } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
    }
    _adoptNodes(t, u) {
      for (let r = this.treeAdapter.getFirstChild(t); r; r = this.treeAdapter.getFirstChild(t)) this.treeAdapter.detachNode(r), this.treeAdapter.appendChild(u, r);
    }
    _setEndLocation(t, u) {
      if (this.treeAdapter.getNodeSourceCodeLocation(t) && u.location) {
        let r = u.location, i = this.treeAdapter.getTagName(t), n = u.type === B.END_TAG && i === u.tagName ? { endTag: L({}, r), endLine: r.endLine, endCol: r.endCol, endOffset: r.endOffset } : { endLine: r.startLine, endCol: r.startCol, endOffset: r.startOffset };
        this.treeAdapter.updateNodeSourceCodeLocation(t, n);
      }
    }
    shouldProcessStartTagTokenInForeignContent(t) {
      if (!this.currentNotInHTML) return false;
      let u, r;
      return this.openElements.stackTop === 0 && this.fragmentContext ? (u = this.fragmentContext, r = this.fragmentContextID) : { current: u, currentTagId: r } = this.openElements, t.tagID === a.SVG && this.treeAdapter.getTagName(u) === h.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(u) === E.MATHML ? false : this.tokenizer.inForeignNode || (t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) && r !== void 0 && !this._isIntegrationPoint(r, u, E.HTML);
    }
    _processToken(t) {
      switch (t.type) {
        case B.CHARACTER: {
          this.onCharacter(t);
          break;
        }
        case B.NULL_CHARACTER: {
          this.onNullCharacter(t);
          break;
        }
        case B.COMMENT: {
          this.onComment(t);
          break;
        }
        case B.DOCTYPE: {
          this.onDoctype(t);
          break;
        }
        case B.START_TAG: {
          this._processStartTag(t);
          break;
        }
        case B.END_TAG: {
          this.onEndTag(t);
          break;
        }
        case B.EOF: {
          this.onEof(t);
          break;
        }
        case B.WHITESPACE_CHARACTER: {
          this.onWhitespaceCharacter(t);
          break;
        }
      }
    }
    _isIntegrationPoint(t, u, r) {
      let i = this.treeAdapter.getNamespaceURI(u), n = this.treeAdapter.getAttrList(u);
      return Ia(t, i, n, r);
    }
    _reconstructActiveFormattingElements() {
      let t = this.activeFormattingElements.entries.length;
      if (t) {
        let u = this.activeFormattingElements.entries.findIndex((i) => i.type === Ne.Marker || this.openElements.contains(i.element)), r = u === -1 ? t - 1 : u - 1;
        for (let i = r; i >= 0; i--) {
          let n = this.activeFormattingElements.entries[i];
          this._insertElement(n.token, this.treeAdapter.getNamespaceURI(n.element)), n.element = this.openElements.current;
        }
      }
    }
    _closeTableCell() {
      this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = d.IN_ROW;
    }
    _closePElement() {
      this.openElements.generateImpliedEndTagsWithExclusion(a.P), this.openElements.popUntilTagNamePopped(a.P);
    }
    _resetInsertionMode() {
      for (let t = this.openElements.stackTop; t >= 0; t--) switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case a.TR: {
          this.insertionMode = d.IN_ROW;
          return;
        }
        case a.TBODY:
        case a.THEAD:
        case a.TFOOT: {
          this.insertionMode = d.IN_TABLE_BODY;
          return;
        }
        case a.CAPTION: {
          this.insertionMode = d.IN_CAPTION;
          return;
        }
        case a.COLGROUP: {
          this.insertionMode = d.IN_COLUMN_GROUP;
          return;
        }
        case a.TABLE: {
          this.insertionMode = d.IN_TABLE;
          return;
        }
        case a.BODY: {
          this.insertionMode = d.IN_BODY;
          return;
        }
        case a.FRAMESET: {
          this.insertionMode = d.IN_FRAMESET;
          return;
        }
        case a.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case a.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case a.HTML: {
          this.insertionMode = this.headElement ? d.AFTER_HEAD : d.BEFORE_HEAD;
          return;
        }
        case a.TD:
        case a.TH: {
          if (t > 0) {
            this.insertionMode = d.IN_CELL;
            return;
          }
          break;
        }
        case a.HEAD: {
          if (t > 0) {
            this.insertionMode = d.IN_HEAD;
            return;
          }
          break;
        }
      }
      this.insertionMode = d.IN_BODY;
    }
    _resetInsertionModeForSelect(t) {
      if (t > 0) for (let u = t - 1; u > 0; u--) {
        let r = this.openElements.tagIDs[u];
        if (r === a.TEMPLATE) break;
        if (r === a.TABLE) {
          this.insertionMode = d.IN_SELECT_IN_TABLE;
          return;
        }
      }
      this.insertionMode = d.IN_SELECT;
    }
    _isElementCausesFosterParenting(t) {
      return pi.has(t);
    }
    _shouldFosterParentOnInsertion() {
      return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
    }
    _findFosterParentingLocation() {
      for (let t = this.openElements.stackTop; t >= 0; t--) {
        let u = this.openElements.items[t];
        switch (this.openElements.tagIDs[t]) {
          case a.TEMPLATE: {
            if (this.treeAdapter.getNamespaceURI(u) === E.HTML) return { parent: this.treeAdapter.getTemplateContent(u), beforeElement: null };
            break;
          }
          case a.TABLE: {
            let r = this.treeAdapter.getParentNode(u);
            return r ? { parent: r, beforeElement: u } : { parent: this.openElements.items[t - 1], beforeElement: null };
          }
          default:
        }
      }
      return { parent: this.openElements.items[0], beforeElement: null };
    }
    _fosterParentElement(t) {
      let u = this._findFosterParentingLocation();
      u.beforeElement ? this.treeAdapter.insertBefore(u.parent, t, u.beforeElement) : this.treeAdapter.appendChild(u.parent, t);
    }
    _isSpecialElement(t, u) {
      let r = this.treeAdapter.getNamespaceURI(t);
      return Ea[r].has(u);
    }
    onCharacter(t) {
      if (this.skipNextNewLine = false, this.tokenizer.inForeignNode) {
        rd(this, t);
        return;
      }
      switch (this.insertionMode) {
        case d.INITIAL: {
          zt(this, t);
          break;
        }
        case d.BEFORE_HTML: {
          eu(this, t);
          break;
        }
        case d.BEFORE_HEAD: {
          tu(this, t);
          break;
        }
        case d.IN_HEAD: {
          uu(this, t);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          ru(this, t);
          break;
        }
        case d.AFTER_HEAD: {
          au(this, t);
          break;
        }
        case d.IN_BODY:
        case d.IN_CAPTION:
        case d.IN_CELL:
        case d.IN_TEMPLATE: {
          Ti(this, t);
          break;
        }
        case d.TEXT:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE: {
          this._insertCharacters(t);
          break;
        }
        case d.IN_TABLE:
        case d.IN_TABLE_BODY:
        case d.IN_ROW: {
          Ca(this, t);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Si(this, t);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          $u(this, t);
          break;
        }
        case d.AFTER_BODY: {
          er(this, t);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          zu(this, t);
          break;
        }
        default:
      }
    }
    onNullCharacter(t) {
      if (this.skipNextNewLine = false, this.tokenizer.inForeignNode) {
        ud(this, t);
        return;
      }
      switch (this.insertionMode) {
        case d.INITIAL: {
          zt(this, t);
          break;
        }
        case d.BEFORE_HTML: {
          eu(this, t);
          break;
        }
        case d.BEFORE_HEAD: {
          tu(this, t);
          break;
        }
        case d.IN_HEAD: {
          uu(this, t);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          ru(this, t);
          break;
        }
        case d.AFTER_HEAD: {
          au(this, t);
          break;
        }
        case d.TEXT: {
          this._insertCharacters(t);
          break;
        }
        case d.IN_TABLE:
        case d.IN_TABLE_BODY:
        case d.IN_ROW: {
          Ca(this, t);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          $u(this, t);
          break;
        }
        case d.AFTER_BODY: {
          er(this, t);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          zu(this, t);
          break;
        }
        default:
      }
    }
    onComment(t) {
      if (this.skipNextNewLine = false, this.currentNotInHTML) {
        _a(this, t);
        return;
      }
      switch (this.insertionMode) {
        case d.INITIAL:
        case d.BEFORE_HTML:
        case d.BEFORE_HEAD:
        case d.IN_HEAD:
        case d.IN_HEAD_NO_SCRIPT:
        case d.AFTER_HEAD:
        case d.IN_BODY:
        case d.IN_TABLE:
        case d.IN_CAPTION:
        case d.IN_COLUMN_GROUP:
        case d.IN_TABLE_BODY:
        case d.IN_ROW:
        case d.IN_CELL:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE:
        case d.IN_TEMPLATE:
        case d.IN_FRAMESET:
        case d.AFTER_FRAMESET: {
          _a(this, t);
          break;
        }
        case d.IN_TABLE_TEXT: {
          $t(this, t);
          break;
        }
        case d.AFTER_BODY: {
          ko(this, t);
          break;
        }
        case d.AFTER_AFTER_BODY:
        case d.AFTER_AFTER_FRAMESET: {
          Fo(this, t);
          break;
        }
        default:
      }
    }
    onDoctype(t) {
      switch (this.skipNextNewLine = false, this.insertionMode) {
        case d.INITIAL: {
          Mo(this, t);
          break;
        }
        case d.BEFORE_HEAD:
        case d.IN_HEAD:
        case d.IN_HEAD_NO_SCRIPT:
        case d.AFTER_HEAD: {
          this._err(t, b.misplacedDoctype);
          break;
        }
        case d.IN_TABLE_TEXT: {
          $t(this, t);
          break;
        }
        default:
      }
    }
    onStartTag(t) {
      this.skipNextNewLine = false, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, b.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
    _processStartTag(t) {
      this.shouldProcessStartTagTokenInForeignContent(t) ? ad(this, t) : this._startTagOutsideForeignContent(t);
    }
    _startTagOutsideForeignContent(t) {
      switch (this.insertionMode) {
        case d.INITIAL: {
          zt(this, t);
          break;
        }
        case d.BEFORE_HTML: {
          Po(this, t);
          break;
        }
        case d.BEFORE_HEAD: {
          Uo(this, t);
          break;
        }
        case d.IN_HEAD: {
          Se(this, t);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          Yo(this, t);
          break;
        }
        case d.AFTER_HEAD: {
          Ko(this, t);
          break;
        }
        case d.IN_BODY: {
          ie(this, t);
          break;
        }
        case d.IN_TABLE: {
          _t(this, t);
          break;
        }
        case d.IN_TABLE_TEXT: {
          $t(this, t);
          break;
        }
        case d.IN_CAPTION: {
          HA(this, t);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          Da(this, t);
          break;
        }
        case d.IN_TABLE_BODY: {
          rr(this, t);
          break;
        }
        case d.IN_ROW: {
          ar(this, t);
          break;
        }
        case d.IN_CELL: {
          GA(this, t);
          break;
        }
        case d.IN_SELECT: {
          Bi(this, t);
          break;
        }
        case d.IN_SELECT_IN_TABLE: {
          WA(this, t);
          break;
        }
        case d.IN_TEMPLATE: {
          qA(this, t);
          break;
        }
        case d.AFTER_BODY: {
          ZA(this, t);
          break;
        }
        case d.IN_FRAMESET: {
          XA(this, t);
          break;
        }
        case d.AFTER_FRAMESET: {
          zA(this, t);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          ed(this, t);
          break;
        }
        case d.AFTER_AFTER_FRAMESET: {
          td(this, t);
          break;
        }
        default:
      }
    }
    onEndTag(t) {
      this.skipNextNewLine = false, this.currentToken = t, this.currentNotInHTML ? id(this, t) : this._endTagOutsideForeignContent(t);
    }
    _endTagOutsideForeignContent(t) {
      switch (this.insertionMode) {
        case d.INITIAL: {
          zt(this, t);
          break;
        }
        case d.BEFORE_HTML: {
          vo(this, t);
          break;
        }
        case d.BEFORE_HEAD: {
          Ho(this, t);
          break;
        }
        case d.IN_HEAD: {
          Qo(this, t);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          Go(this, t);
          break;
        }
        case d.AFTER_HEAD: {
          Wo(this, t);
          break;
        }
        case d.IN_BODY: {
          ur(this, t);
          break;
        }
        case d.TEXT: {
          RA(this, t);
          break;
        }
        case d.IN_TABLE: {
          iu(this, t);
          break;
        }
        case d.IN_TABLE_TEXT: {
          $t(this, t);
          break;
        }
        case d.IN_CAPTION: {
          QA(this, t);
          break;
        }
        case d.IN_COLUMN_GROUP: {
          YA(this, t);
          break;
        }
        case d.IN_TABLE_BODY: {
          xa(this, t);
          break;
        }
        case d.IN_ROW: {
          yi(this, t);
          break;
        }
        case d.IN_CELL: {
          KA(this, t);
          break;
        }
        case d.IN_SELECT: {
          Ri(this, t);
          break;
        }
        case d.IN_SELECT_IN_TABLE: {
          JA(this, t);
          break;
        }
        case d.IN_TEMPLATE: {
          VA(this, t);
          break;
        }
        case d.AFTER_BODY: {
          Oi(this, t);
          break;
        }
        case d.IN_FRAMESET: {
          jA(this, t);
          break;
        }
        case d.AFTER_FRAMESET: {
          $A(this, t);
          break;
        }
        case d.AFTER_AFTER_BODY: {
          zu(this, t);
          break;
        }
        default:
      }
    }
    onEof(t) {
      switch (this.insertionMode) {
        case d.INITIAL: {
          zt(this, t);
          break;
        }
        case d.BEFORE_HTML: {
          eu(this, t);
          break;
        }
        case d.BEFORE_HEAD: {
          tu(this, t);
          break;
        }
        case d.IN_HEAD: {
          uu(this, t);
          break;
        }
        case d.IN_HEAD_NO_SCRIPT: {
          ru(this, t);
          break;
        }
        case d.AFTER_HEAD: {
          au(this, t);
          break;
        }
        case d.IN_BODY:
        case d.IN_TABLE:
        case d.IN_CAPTION:
        case d.IN_COLUMN_GROUP:
        case d.IN_TABLE_BODY:
        case d.IN_ROW:
        case d.IN_CELL:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE: {
          xi(this, t);
          break;
        }
        case d.TEXT: {
          LA(this, t);
          break;
        }
        case d.IN_TABLE_TEXT: {
          $t(this, t);
          break;
        }
        case d.IN_TEMPLATE: {
          Li(this, t);
          break;
        }
        case d.AFTER_BODY:
        case d.IN_FRAMESET:
        case d.AFTER_FRAMESET:
        case d.AFTER_AFTER_BODY:
        case d.AFTER_AFTER_FRAMESET: {
          Sa(this, t);
          break;
        }
        default:
      }
    }
    onWhitespaceCharacter(t) {
      if (this.skipNextNewLine && (this.skipNextNewLine = false, t.chars.charCodeAt(0) === c.LINE_FEED)) {
        if (t.chars.length === 1) return;
        t.chars = t.chars.substr(1);
      }
      if (this.tokenizer.inForeignNode) {
        this._insertCharacters(t);
        return;
      }
      switch (this.insertionMode) {
        case d.IN_HEAD:
        case d.IN_HEAD_NO_SCRIPT:
        case d.AFTER_HEAD:
        case d.TEXT:
        case d.IN_COLUMN_GROUP:
        case d.IN_SELECT:
        case d.IN_SELECT_IN_TABLE:
        case d.IN_FRAMESET:
        case d.AFTER_FRAMESET: {
          this._insertCharacters(t);
          break;
        }
        case d.IN_BODY:
        case d.IN_CAPTION:
        case d.IN_CELL:
        case d.IN_TEMPLATE:
        case d.AFTER_BODY:
        case d.AFTER_AFTER_BODY:
        case d.AFTER_AFTER_FRAMESET: {
          gi(this, t);
          break;
        }
        case d.IN_TABLE:
        case d.IN_TABLE_BODY:
        case d.IN_ROW: {
          Ca(this, t);
          break;
        }
        case d.IN_TABLE_TEXT: {
          Ni(this, t);
          break;
        }
        default:
      }
    }
  };
  function yo(e, t) {
    let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
    return u ? e.openElements.contains(u.element) ? e.openElements.hasInScope(t.tagID) || (u = null) : (e.activeFormattingElements.removeEntry(u), u = null) : _i(e, t), u;
  }
  function Bo(e, t) {
    let u = null, r = e.openElements.stackTop;
    for (; r >= 0; r--) {
      let i = e.openElements.items[r];
      if (i === t.element) break;
      e._isSpecialElement(i, e.openElements.tagIDs[r]) && (u = i);
    }
    return u || (e.openElements.shortenToLength(Math.max(r, 0)), e.activeFormattingElements.removeEntry(t)), u;
  }
  function Ro(e, t, u) {
    let r = t, i = e.openElements.getCommonAncestor(t);
    for (let n = 0, s = i; s !== u; n++, s = i) {
      i = e.openElements.getCommonAncestor(s);
      let A = e.activeFormattingElements.getElementEntry(s), l = A && n >= So;
      !A || l ? (l && e.activeFormattingElements.removeEntry(A), e.openElements.remove(s)) : (s = Lo(e, A), r === t && (e.activeFormattingElements.bookmark = A), e.treeAdapter.detachNode(r), e.treeAdapter.appendChild(s, r), r = s);
    }
    return r;
  }
  function Lo(e, t) {
    let u = e.treeAdapter.getNamespaceURI(t.element), r = e.treeAdapter.createElement(t.token.tagName, u, t.token.attrs);
    return e.openElements.replace(t.element, r), t.element = r, r;
  }
  function Oo(e, t, u) {
    let r = e.treeAdapter.getTagName(t), i = Ze(r);
    if (e._isElementCausesFosterParenting(i)) e._fosterParentElement(u);
    else {
      let n = e.treeAdapter.getNamespaceURI(t);
      i === a.TEMPLATE && n === E.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, u);
    }
  }
  function wo(e, t, u) {
    let r = e.treeAdapter.getNamespaceURI(u.element), { token: i } = u, n = e.treeAdapter.createElement(i.tagName, r, i.attrs);
    e._adoptNodes(t, n), e.treeAdapter.appendChild(t, n), e.activeFormattingElements.insertElementAfterBookmark(n, i), e.activeFormattingElements.removeEntry(u), e.openElements.remove(u.element), e.openElements.insertAfter(t, n, i.tagID);
  }
  function Na(e, t) {
    for (let u = 0; u < No; u++) {
      let r = yo(e, t);
      if (!r) break;
      let i = Bo(e, r);
      if (!i) break;
      e.activeFormattingElements.bookmark = r;
      let n = Ro(e, i, r.element), s = e.openElements.getCommonAncestor(r.element);
      e.treeAdapter.detachNode(n), s && Oo(e, s, n), wo(e, i, r);
    }
  }
  function _a(e, t) {
    e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
  }
  function ko(e, t) {
    e._appendCommentNode(t, e.openElements.items[0]);
  }
  function Fo(e, t) {
    e._appendCommentNode(t, e.document);
  }
  function Sa(e, t) {
    if (e.stopped = true, t.location) {
      let u = e.fragmentContext ? 0 : 2;
      for (let r = e.openElements.stackTop; r >= u; r--) e._setEndLocation(e.openElements.items[r], t);
      if (!e.fragmentContext && e.openElements.stackTop >= 0) {
        let r = e.openElements.items[0], i = e.treeAdapter.getNodeSourceCodeLocation(r);
        if (i && !i.endTag && (e._setEndLocation(r, t), e.openElements.stackTop >= 1)) {
          let n = e.openElements.items[1], s = e.treeAdapter.getNodeSourceCodeLocation(n);
          s && !s.endTag && e._setEndLocation(n, t);
        }
      }
    }
  }
  function Mo(e, t) {
    e._setDocumentType(t);
    let u = t.forceQuirks ? re.QUIRKS : li(t);
    di(t) || e._err(t, b.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, u), e.insertionMode = d.BEFORE_HTML;
  }
  function zt(e, t) {
    e._err(t, b.missingDoctype, true), e.treeAdapter.setDocumentMode(e.document, re.QUIRKS), e.insertionMode = d.BEFORE_HTML, e._processToken(t);
  }
  function Po(e, t) {
    t.tagID === a.HTML ? (e._insertElement(t, E.HTML), e.insertionMode = d.BEFORE_HEAD) : eu(e, t);
  }
  function vo(e, t) {
    let u = t.tagID;
    (u === a.HTML || u === a.HEAD || u === a.BODY || u === a.BR) && eu(e, t);
  }
  function eu(e, t) {
    e._insertFakeRootElement(), e.insertionMode = d.BEFORE_HEAD, e._processToken(t);
  }
  function Uo(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.HEAD: {
        e._insertElement(t, E.HTML), e.headElement = e.openElements.current, e.insertionMode = d.IN_HEAD;
        break;
      }
      default:
        tu(e, t);
    }
  }
  function Ho(e, t) {
    let u = t.tagID;
    u === a.HEAD || u === a.BODY || u === a.HTML || u === a.BR ? tu(e, t) : e._err(t, b.endTagWithoutMatchingOpenElement);
  }
  function tu(e, t) {
    e._insertFakeElement(h.HEAD, a.HEAD), e.headElement = e.openElements.current, e.insertionMode = d.IN_HEAD, e._processToken(t);
  }
  function Se(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.BASE:
      case a.BASEFONT:
      case a.BGSOUND:
      case a.LINK:
      case a.META: {
        e._appendElement(t, E.HTML), t.ackSelfClosing = true;
        break;
      }
      case a.TITLE: {
        e._switchToTextParsing(t, ae.RCDATA);
        break;
      }
      case a.NOSCRIPT: {
        e.options.scriptingEnabled ? e._switchToTextParsing(t, ae.RAWTEXT) : (e._insertElement(t, E.HTML), e.insertionMode = d.IN_HEAD_NO_SCRIPT);
        break;
      }
      case a.NOFRAMES:
      case a.STYLE: {
        e._switchToTextParsing(t, ae.RAWTEXT);
        break;
      }
      case a.SCRIPT: {
        e._switchToTextParsing(t, ae.SCRIPT_DATA);
        break;
      }
      case a.TEMPLATE: {
        e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = false, e.insertionMode = d.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(d.IN_TEMPLATE);
        break;
      }
      case a.HEAD: {
        e._err(t, b.misplacedStartTagForHeadElement);
        break;
      }
      default:
        uu(e, t);
    }
  }
  function Qo(e, t) {
    switch (t.tagID) {
      case a.HEAD: {
        e.openElements.pop(), e.insertionMode = d.AFTER_HEAD;
        break;
      }
      case a.BODY:
      case a.BR:
      case a.HTML: {
        uu(e, t);
        break;
      }
      case a.TEMPLATE: {
        ct(e, t);
        break;
      }
      default:
        e._err(t, b.endTagWithoutMatchingOpenElement);
    }
  }
  function ct(e, t) {
    e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== a.TEMPLATE && e._err(t, b.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, b.endTagWithoutMatchingOpenElement);
  }
  function uu(e, t) {
    e.openElements.pop(), e.insertionMode = d.AFTER_HEAD, e._processToken(t);
  }
  function Yo(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.BASEFONT:
      case a.BGSOUND:
      case a.HEAD:
      case a.LINK:
      case a.META:
      case a.NOFRAMES:
      case a.STYLE: {
        Se(e, t);
        break;
      }
      case a.NOSCRIPT: {
        e._err(t, b.nestedNoscriptInHead);
        break;
      }
      default:
        ru(e, t);
    }
  }
  function Go(e, t) {
    switch (t.tagID) {
      case a.NOSCRIPT: {
        e.openElements.pop(), e.insertionMode = d.IN_HEAD;
        break;
      }
      case a.BR: {
        ru(e, t);
        break;
      }
      default:
        e._err(t, b.endTagWithoutMatchingOpenElement);
    }
  }
  function ru(e, t) {
    let u = t.type === B.EOF ? b.openElementsLeftAfterEof : b.disallowedContentInNoscriptInHead;
    e._err(t, u), e.openElements.pop(), e.insertionMode = d.IN_HEAD, e._processToken(t);
  }
  function Ko(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.BODY: {
        e._insertElement(t, E.HTML), e.framesetOk = false, e.insertionMode = d.IN_BODY;
        break;
      }
      case a.FRAMESET: {
        e._insertElement(t, E.HTML), e.insertionMode = d.IN_FRAMESET;
        break;
      }
      case a.BASE:
      case a.BASEFONT:
      case a.BGSOUND:
      case a.LINK:
      case a.META:
      case a.NOFRAMES:
      case a.SCRIPT:
      case a.STYLE:
      case a.TEMPLATE:
      case a.TITLE: {
        e._err(t, b.abandonedHeadElementChild), e.openElements.push(e.headElement, a.HEAD), Se(e, t), e.openElements.remove(e.headElement);
        break;
      }
      case a.HEAD: {
        e._err(t, b.misplacedStartTagForHeadElement);
        break;
      }
      default:
        au(e, t);
    }
  }
  function Wo(e, t) {
    switch (t.tagID) {
      case a.BODY:
      case a.HTML:
      case a.BR: {
        au(e, t);
        break;
      }
      case a.TEMPLATE: {
        ct(e, t);
        break;
      }
      default:
        e._err(t, b.endTagWithoutMatchingOpenElement);
    }
  }
  function au(e, t) {
    e._insertFakeElement(h.BODY, a.BODY), e.insertionMode = d.IN_BODY, tr(e, t);
  }
  function tr(e, t) {
    switch (t.type) {
      case B.CHARACTER: {
        Ti(e, t);
        break;
      }
      case B.WHITESPACE_CHARACTER: {
        gi(e, t);
        break;
      }
      case B.COMMENT: {
        _a(e, t);
        break;
      }
      case B.START_TAG: {
        ie(e, t);
        break;
      }
      case B.END_TAG: {
        ur(e, t);
        break;
      }
      case B.EOF: {
        xi(e, t);
        break;
      }
      default:
    }
  }
  function gi(e, t) {
    e._reconstructActiveFormattingElements(), e._insertCharacters(t);
  }
  function Ti(e, t) {
    e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = false;
  }
  function Jo(e, t) {
    e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
  }
  function qo(e, t) {
    let u = e.openElements.tryPeekProperlyNestedBodyElement();
    u && e.openElements.tmplCount === 0 && (e.framesetOk = false, e.treeAdapter.adoptAttributes(u, t.attrs));
  }
  function Vo(e, t) {
    let u = e.openElements.tryPeekProperlyNestedBodyElement();
    e.framesetOk && u && (e.treeAdapter.detachNode(u), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, E.HTML), e.insertionMode = d.IN_FRAMESET);
  }
  function Zo(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, E.HTML);
  }
  function Xo(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && It.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, E.HTML);
  }
  function jo(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, E.HTML), e.skipNextNewLine = true, e.framesetOk = false;
  }
  function zo(e, t) {
    let u = e.openElements.tmplCount > 0;
    (!e.formElement || u) && (e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, E.HTML), u || (e.formElement = e.openElements.current));
  }
  function $o(e, t) {
    e.framesetOk = false;
    let u = t.tagID;
    for (let r = e.openElements.stackTop; r >= 0; r--) {
      let i = e.openElements.tagIDs[r];
      if (u === a.LI && i === a.LI || (u === a.DD || u === a.DT) && (i === a.DD || i === a.DT)) {
        e.openElements.generateImpliedEndTagsWithExclusion(i), e.openElements.popUntilTagNamePopped(i);
        break;
      }
      if (i !== a.ADDRESS && i !== a.DIV && i !== a.P && e._isSpecialElement(e.openElements.items[r], i)) break;
    }
    e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, E.HTML);
  }
  function eA(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, E.HTML), e.tokenizer.state = ae.PLAINTEXT;
  }
  function tA(e, t) {
    e.openElements.hasInScope(a.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, E.HTML), e.framesetOk = false;
  }
  function uA(e, t) {
    let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(h.A);
    u && (Na(e, t), e.openElements.remove(u.element), e.activeFormattingElements.removeEntry(u)), e._reconstructActiveFormattingElements(), e._insertElement(t, E.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
  }
  function rA(e, t) {
    e._reconstructActiveFormattingElements(), e._insertElement(t, E.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
  }
  function aA(e, t) {
    e._reconstructActiveFormattingElements(), e.openElements.hasInScope(a.NOBR) && (Na(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, E.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
  }
  function iA(e, t) {
    e._reconstructActiveFormattingElements(), e._insertElement(t, E.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = false;
  }
  function nA(e, t) {
    e.treeAdapter.getDocumentMode(e.document) !== re.QUIRKS && e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, E.HTML), e.framesetOk = false, e.insertionMode = d.IN_TABLE;
  }
  function Ii(e, t) {
    e._reconstructActiveFormattingElements(), e._appendElement(t, E.HTML), e.framesetOk = false, t.ackSelfClosing = true;
  }
  function Ci(e) {
    let t = qt(e, Be.TYPE);
    return t != null && t.toLowerCase() === xo;
  }
  function sA(e, t) {
    e._reconstructActiveFormattingElements(), e._appendElement(t, E.HTML), Ci(t) || (e.framesetOk = false), t.ackSelfClosing = true;
  }
  function cA(e, t) {
    e._appendElement(t, E.HTML), t.ackSelfClosing = true;
  }
  function oA(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._appendElement(t, E.HTML), e.framesetOk = false, t.ackSelfClosing = true;
  }
  function AA(e, t) {
    t.tagName = h.IMG, t.tagID = a.IMG, Ii(e, t);
  }
  function dA(e, t) {
    e._insertElement(t, E.HTML), e.skipNextNewLine = true, e.tokenizer.state = ae.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = false, e.insertionMode = d.TEXT;
  }
  function lA(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = false, e._switchToTextParsing(t, ae.RAWTEXT);
  }
  function fA(e, t) {
    e.framesetOk = false, e._switchToTextParsing(t, ae.RAWTEXT);
  }
  function mi(e, t) {
    e._switchToTextParsing(t, ae.RAWTEXT);
  }
  function hA(e, t) {
    e._reconstructActiveFormattingElements(), e._insertElement(t, E.HTML), e.framesetOk = false, e.insertionMode = e.insertionMode === d.IN_TABLE || e.insertionMode === d.IN_CAPTION || e.insertionMode === d.IN_TABLE_BODY || e.insertionMode === d.IN_ROW || e.insertionMode === d.IN_CELL ? d.IN_SELECT_IN_TABLE : d.IN_SELECT;
  }
  function bA(e, t) {
    e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, E.HTML);
  }
  function mA(e, t) {
    e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, E.HTML);
  }
  function EA(e, t) {
    e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(a.RTC), e._insertElement(t, E.HTML);
  }
  function pA(e, t) {
    e._reconstructActiveFormattingElements(), Zu(t), jt(t), t.selfClosing ? e._appendElement(t, E.MATHML) : e._insertElement(t, E.MATHML), t.ackSelfClosing = true;
  }
  function gA(e, t) {
    e._reconstructActiveFormattingElements(), Xu(t), jt(t), t.selfClosing ? e._appendElement(t, E.SVG) : e._insertElement(t, E.SVG), t.ackSelfClosing = true;
  }
  function Ei(e, t) {
    e._reconstructActiveFormattingElements(), e._insertElement(t, E.HTML);
  }
  function ie(e, t) {
    switch (t.tagID) {
      case a.I:
      case a.S:
      case a.B:
      case a.U:
      case a.EM:
      case a.TT:
      case a.BIG:
      case a.CODE:
      case a.FONT:
      case a.SMALL:
      case a.STRIKE:
      case a.STRONG: {
        rA(e, t);
        break;
      }
      case a.A: {
        uA(e, t);
        break;
      }
      case a.H1:
      case a.H2:
      case a.H3:
      case a.H4:
      case a.H5:
      case a.H6: {
        Xo(e, t);
        break;
      }
      case a.P:
      case a.DL:
      case a.OL:
      case a.UL:
      case a.DIV:
      case a.DIR:
      case a.NAV:
      case a.MAIN:
      case a.MENU:
      case a.ASIDE:
      case a.CENTER:
      case a.FIGURE:
      case a.FOOTER:
      case a.HEADER:
      case a.HGROUP:
      case a.DIALOG:
      case a.DETAILS:
      case a.ADDRESS:
      case a.ARTICLE:
      case a.SEARCH:
      case a.SECTION:
      case a.SUMMARY:
      case a.FIELDSET:
      case a.BLOCKQUOTE:
      case a.FIGCAPTION: {
        Zo(e, t);
        break;
      }
      case a.LI:
      case a.DD:
      case a.DT: {
        $o(e, t);
        break;
      }
      case a.BR:
      case a.IMG:
      case a.WBR:
      case a.AREA:
      case a.EMBED:
      case a.KEYGEN: {
        Ii(e, t);
        break;
      }
      case a.HR: {
        oA(e, t);
        break;
      }
      case a.RB:
      case a.RTC: {
        mA(e, t);
        break;
      }
      case a.RT:
      case a.RP: {
        EA(e, t);
        break;
      }
      case a.PRE:
      case a.LISTING: {
        jo(e, t);
        break;
      }
      case a.XMP: {
        lA(e, t);
        break;
      }
      case a.SVG: {
        gA(e, t);
        break;
      }
      case a.HTML: {
        Jo(e, t);
        break;
      }
      case a.BASE:
      case a.LINK:
      case a.META:
      case a.STYLE:
      case a.TITLE:
      case a.SCRIPT:
      case a.BGSOUND:
      case a.BASEFONT:
      case a.TEMPLATE: {
        Se(e, t);
        break;
      }
      case a.BODY: {
        qo(e, t);
        break;
      }
      case a.FORM: {
        zo(e, t);
        break;
      }
      case a.NOBR: {
        aA(e, t);
        break;
      }
      case a.MATH: {
        pA(e, t);
        break;
      }
      case a.TABLE: {
        nA(e, t);
        break;
      }
      case a.INPUT: {
        sA(e, t);
        break;
      }
      case a.PARAM:
      case a.TRACK:
      case a.SOURCE: {
        cA(e, t);
        break;
      }
      case a.IMAGE: {
        AA(e, t);
        break;
      }
      case a.BUTTON: {
        tA(e, t);
        break;
      }
      case a.APPLET:
      case a.OBJECT:
      case a.MARQUEE: {
        iA(e, t);
        break;
      }
      case a.IFRAME: {
        fA(e, t);
        break;
      }
      case a.SELECT: {
        hA(e, t);
        break;
      }
      case a.OPTION:
      case a.OPTGROUP: {
        bA(e, t);
        break;
      }
      case a.NOEMBED:
      case a.NOFRAMES: {
        mi(e, t);
        break;
      }
      case a.FRAMESET: {
        Vo(e, t);
        break;
      }
      case a.TEXTAREA: {
        dA(e, t);
        break;
      }
      case a.NOSCRIPT: {
        e.options.scriptingEnabled ? mi(e, t) : Ei(e, t);
        break;
      }
      case a.PLAINTEXT: {
        eA(e, t);
        break;
      }
      case a.COL:
      case a.TH:
      case a.TD:
      case a.TR:
      case a.HEAD:
      case a.FRAME:
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD:
      case a.CAPTION:
      case a.COLGROUP:
        break;
      default:
        Ei(e, t);
    }
  }
  function TA(e, t) {
    if (e.openElements.hasInScope(a.BODY) && (e.insertionMode = d.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
      let u = e.openElements.tryPeekProperlyNestedBodyElement();
      u && e._setEndLocation(u, t);
    }
  }
  function IA(e, t) {
    e.openElements.hasInScope(a.BODY) && (e.insertionMode = d.AFTER_BODY, Oi(e, t));
  }
  function CA(e, t) {
    let u = t.tagID;
    e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u));
  }
  function _A(e) {
    let t = e.openElements.tmplCount > 0, { formElement: u } = e;
    t || (e.formElement = null), (u || t) && e.openElements.hasInScope(a.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(a.FORM) : u && e.openElements.remove(u));
  }
  function xA(e) {
    e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(h.P, a.P), e._closePElement();
  }
  function NA(e) {
    e.openElements.hasInListItemScope(a.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(a.LI), e.openElements.popUntilTagNamePopped(a.LI));
  }
  function SA(e, t) {
    let u = t.tagID;
    e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u));
  }
  function DA(e) {
    e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
  }
  function yA(e, t) {
    let u = t.tagID;
    e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker());
  }
  function BA(e) {
    e._reconstructActiveFormattingElements(), e._insertFakeElement(h.BR, a.BR), e.openElements.pop(), e.framesetOk = false;
  }
  function _i(e, t) {
    let u = t.tagName, r = t.tagID;
    for (let i = e.openElements.stackTop; i > 0; i--) {
      let n = e.openElements.items[i], s = e.openElements.tagIDs[i];
      if (r === s && (r !== a.UNKNOWN || e.treeAdapter.getTagName(n) === u)) {
        e.openElements.generateImpliedEndTagsWithExclusion(r), e.openElements.stackTop >= i && e.openElements.shortenToLength(i);
        break;
      }
      if (e._isSpecialElement(n, s)) break;
    }
  }
  function ur(e, t) {
    switch (t.tagID) {
      case a.A:
      case a.B:
      case a.I:
      case a.S:
      case a.U:
      case a.EM:
      case a.TT:
      case a.BIG:
      case a.CODE:
      case a.FONT:
      case a.NOBR:
      case a.SMALL:
      case a.STRIKE:
      case a.STRONG: {
        Na(e, t);
        break;
      }
      case a.P: {
        xA(e);
        break;
      }
      case a.DL:
      case a.UL:
      case a.OL:
      case a.DIR:
      case a.DIV:
      case a.NAV:
      case a.PRE:
      case a.MAIN:
      case a.MENU:
      case a.ASIDE:
      case a.BUTTON:
      case a.CENTER:
      case a.FIGURE:
      case a.FOOTER:
      case a.HEADER:
      case a.HGROUP:
      case a.DIALOG:
      case a.ADDRESS:
      case a.ARTICLE:
      case a.DETAILS:
      case a.SEARCH:
      case a.SECTION:
      case a.SUMMARY:
      case a.LISTING:
      case a.FIELDSET:
      case a.BLOCKQUOTE:
      case a.FIGCAPTION: {
        CA(e, t);
        break;
      }
      case a.LI: {
        NA(e);
        break;
      }
      case a.DD:
      case a.DT: {
        SA(e, t);
        break;
      }
      case a.H1:
      case a.H2:
      case a.H3:
      case a.H4:
      case a.H5:
      case a.H6: {
        DA(e);
        break;
      }
      case a.BR: {
        BA(e);
        break;
      }
      case a.BODY: {
        TA(e, t);
        break;
      }
      case a.HTML: {
        IA(e, t);
        break;
      }
      case a.FORM: {
        _A(e);
        break;
      }
      case a.APPLET:
      case a.OBJECT:
      case a.MARQUEE: {
        yA(e, t);
        break;
      }
      case a.TEMPLATE: {
        ct(e, t);
        break;
      }
      default:
        _i(e, t);
    }
  }
  function xi(e, t) {
    e.tmplInsertionModeStack.length > 0 ? Li(e, t) : Sa(e, t);
  }
  function RA(e, t) {
    var u;
    t.tagID === a.SCRIPT && ((u = e.scriptHandler) === null || u === void 0 || u.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
  }
  function LA(e, t) {
    e._err(t, b.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
  }
  function Ca(e, t) {
    if (e.openElements.currentTagId !== void 0 && pi.has(e.openElements.currentTagId)) switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = false, e.originalInsertionMode = e.insertionMode, e.insertionMode = d.IN_TABLE_TEXT, t.type) {
      case B.CHARACTER: {
        Si(e, t);
        break;
      }
      case B.WHITESPACE_CHARACTER: {
        Ni(e, t);
        break;
      }
    }
    else nu(e, t);
  }
  function OA(e, t) {
    e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, E.HTML), e.insertionMode = d.IN_CAPTION;
  }
  function wA(e, t) {
    e.openElements.clearBackToTableContext(), e._insertElement(t, E.HTML), e.insertionMode = d.IN_COLUMN_GROUP;
  }
  function kA(e, t) {
    e.openElements.clearBackToTableContext(), e._insertFakeElement(h.COLGROUP, a.COLGROUP), e.insertionMode = d.IN_COLUMN_GROUP, Da(e, t);
  }
  function FA(e, t) {
    e.openElements.clearBackToTableContext(), e._insertElement(t, E.HTML), e.insertionMode = d.IN_TABLE_BODY;
  }
  function MA(e, t) {
    e.openElements.clearBackToTableContext(), e._insertFakeElement(h.TBODY, a.TBODY), e.insertionMode = d.IN_TABLE_BODY, rr(e, t);
  }
  function PA(e, t) {
    e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode(), e._processStartTag(t));
  }
  function vA(e, t) {
    Ci(t) ? e._appendElement(t, E.HTML) : nu(e, t), t.ackSelfClosing = true;
  }
  function UA(e, t) {
    !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, E.HTML), e.formElement = e.openElements.current, e.openElements.pop());
  }
  function _t(e, t) {
    switch (t.tagID) {
      case a.TD:
      case a.TH:
      case a.TR: {
        MA(e, t);
        break;
      }
      case a.STYLE:
      case a.SCRIPT:
      case a.TEMPLATE: {
        Se(e, t);
        break;
      }
      case a.COL: {
        kA(e, t);
        break;
      }
      case a.FORM: {
        UA(e, t);
        break;
      }
      case a.TABLE: {
        PA(e, t);
        break;
      }
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD: {
        FA(e, t);
        break;
      }
      case a.INPUT: {
        vA(e, t);
        break;
      }
      case a.CAPTION: {
        OA(e, t);
        break;
      }
      case a.COLGROUP: {
        wA(e, t);
        break;
      }
      default:
        nu(e, t);
    }
  }
  function iu(e, t) {
    switch (t.tagID) {
      case a.TABLE: {
        e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode());
        break;
      }
      case a.TEMPLATE: {
        ct(e, t);
        break;
      }
      case a.BODY:
      case a.CAPTION:
      case a.COL:
      case a.COLGROUP:
      case a.HTML:
      case a.TBODY:
      case a.TD:
      case a.TFOOT:
      case a.TH:
      case a.THEAD:
      case a.TR:
        break;
      default:
        nu(e, t);
    }
  }
  function nu(e, t) {
    let u = e.fosterParentingEnabled;
    e.fosterParentingEnabled = true, tr(e, t), e.fosterParentingEnabled = u;
  }
  function Ni(e, t) {
    e.pendingCharacterTokens.push(t);
  }
  function Si(e, t) {
    e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = true;
  }
  function $t(e, t) {
    let u = 0;
    if (e.hasNonWhitespacePendingCharacterToken) for (; u < e.pendingCharacterTokens.length; u++) nu(e, e.pendingCharacterTokens[u]);
    else for (; u < e.pendingCharacterTokens.length; u++) e._insertCharacters(e.pendingCharacterTokens[u]);
    e.insertionMode = e.originalInsertionMode, e._processToken(t);
  }
  var Di = /* @__PURE__ */ new Set([a.CAPTION, a.COL, a.COLGROUP, a.TBODY, a.TD, a.TFOOT, a.TH, a.THEAD, a.TR]);
  function HA(e, t) {
    let u = t.tagID;
    Di.has(u) ? e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = d.IN_TABLE, _t(e, t)) : ie(e, t);
  }
  function QA(e, t) {
    let u = t.tagID;
    switch (u) {
      case a.CAPTION:
      case a.TABLE: {
        e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = d.IN_TABLE, u === a.TABLE && iu(e, t));
        break;
      }
      case a.BODY:
      case a.COL:
      case a.COLGROUP:
      case a.HTML:
      case a.TBODY:
      case a.TD:
      case a.TFOOT:
      case a.TH:
      case a.THEAD:
      case a.TR:
        break;
      default:
        ur(e, t);
    }
  }
  function Da(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.COL: {
        e._appendElement(t, E.HTML), t.ackSelfClosing = true;
        break;
      }
      case a.TEMPLATE: {
        Se(e, t);
        break;
      }
      default:
        $u(e, t);
    }
  }
  function YA(e, t) {
    switch (t.tagID) {
      case a.COLGROUP: {
        e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = d.IN_TABLE);
        break;
      }
      case a.TEMPLATE: {
        ct(e, t);
        break;
      }
      case a.COL:
        break;
      default:
        $u(e, t);
    }
  }
  function $u(e, t) {
    e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = d.IN_TABLE, e._processToken(t));
  }
  function rr(e, t) {
    switch (t.tagID) {
      case a.TR: {
        e.openElements.clearBackToTableBodyContext(), e._insertElement(t, E.HTML), e.insertionMode = d.IN_ROW;
        break;
      }
      case a.TH:
      case a.TD: {
        e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(h.TR, a.TR), e.insertionMode = d.IN_ROW, ar(e, t);
        break;
      }
      case a.CAPTION:
      case a.COL:
      case a.COLGROUP:
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD: {
        e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE, _t(e, t));
        break;
      }
      default:
        _t(e, t);
    }
  }
  function xa(e, t) {
    let u = t.tagID;
    switch (t.tagID) {
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD: {
        e.openElements.hasInTableScope(u) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE);
        break;
      }
      case a.TABLE: {
        e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE, iu(e, t));
        break;
      }
      case a.BODY:
      case a.CAPTION:
      case a.COL:
      case a.COLGROUP:
      case a.HTML:
      case a.TD:
      case a.TH:
      case a.TR:
        break;
      default:
        iu(e, t);
    }
  }
  function ar(e, t) {
    switch (t.tagID) {
      case a.TH:
      case a.TD: {
        e.openElements.clearBackToTableRowContext(), e._insertElement(t, E.HTML), e.insertionMode = d.IN_CELL, e.activeFormattingElements.insertMarker();
        break;
      }
      case a.CAPTION:
      case a.COL:
      case a.COLGROUP:
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD:
      case a.TR: {
        e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY, rr(e, t));
        break;
      }
      default:
        _t(e, t);
    }
  }
  function yi(e, t) {
    switch (t.tagID) {
      case a.TR: {
        e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY);
        break;
      }
      case a.TABLE: {
        e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY, xa(e, t));
        break;
      }
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD: {
        (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(a.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = d.IN_TABLE_BODY, xa(e, t));
        break;
      }
      case a.BODY:
      case a.CAPTION:
      case a.COL:
      case a.COLGROUP:
      case a.HTML:
      case a.TD:
      case a.TH:
        break;
      default:
        iu(e, t);
    }
  }
  function GA(e, t) {
    let u = t.tagID;
    Di.has(u) ? (e.openElements.hasInTableScope(a.TD) || e.openElements.hasInTableScope(a.TH)) && (e._closeTableCell(), ar(e, t)) : ie(e, t);
  }
  function KA(e, t) {
    let u = t.tagID;
    switch (u) {
      case a.TD:
      case a.TH: {
        e.openElements.hasInTableScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = d.IN_ROW);
        break;
      }
      case a.TABLE:
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD:
      case a.TR: {
        e.openElements.hasInTableScope(u) && (e._closeTableCell(), yi(e, t));
        break;
      }
      case a.BODY:
      case a.CAPTION:
      case a.COL:
      case a.COLGROUP:
      case a.HTML:
        break;
      default:
        ur(e, t);
    }
  }
  function Bi(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.OPTION: {
        e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._insertElement(t, E.HTML);
        break;
      }
      case a.OPTGROUP: {
        e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._insertElement(t, E.HTML);
        break;
      }
      case a.HR: {
        e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._appendElement(t, E.HTML), t.ackSelfClosing = true;
        break;
      }
      case a.INPUT:
      case a.KEYGEN:
      case a.TEXTAREA:
      case a.SELECT: {
        e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), t.tagID !== a.SELECT && e._processStartTag(t));
        break;
      }
      case a.SCRIPT:
      case a.TEMPLATE: {
        Se(e, t);
        break;
      }
      default:
    }
  }
  function Ri(e, t) {
    switch (t.tagID) {
      case a.OPTGROUP: {
        e.openElements.stackTop > 0 && e.openElements.currentTagId === a.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === a.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop();
        break;
      }
      case a.OPTION: {
        e.openElements.currentTagId === a.OPTION && e.openElements.pop();
        break;
      }
      case a.SELECT: {
        e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode());
        break;
      }
      case a.TEMPLATE: {
        ct(e, t);
        break;
      }
      default:
    }
  }
  function WA(e, t) {
    let u = t.tagID;
    u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : Bi(e, t);
  }
  function JA(e, t) {
    let u = t.tagID;
    u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? e.openElements.hasInTableScope(u) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Ri(e, t);
  }
  function qA(e, t) {
    switch (t.tagID) {
      case a.BASE:
      case a.BASEFONT:
      case a.BGSOUND:
      case a.LINK:
      case a.META:
      case a.NOFRAMES:
      case a.SCRIPT:
      case a.STYLE:
      case a.TEMPLATE:
      case a.TITLE: {
        Se(e, t);
        break;
      }
      case a.CAPTION:
      case a.COLGROUP:
      case a.TBODY:
      case a.TFOOT:
      case a.THEAD: {
        e.tmplInsertionModeStack[0] = d.IN_TABLE, e.insertionMode = d.IN_TABLE, _t(e, t);
        break;
      }
      case a.COL: {
        e.tmplInsertionModeStack[0] = d.IN_COLUMN_GROUP, e.insertionMode = d.IN_COLUMN_GROUP, Da(e, t);
        break;
      }
      case a.TR: {
        e.tmplInsertionModeStack[0] = d.IN_TABLE_BODY, e.insertionMode = d.IN_TABLE_BODY, rr(e, t);
        break;
      }
      case a.TD:
      case a.TH: {
        e.tmplInsertionModeStack[0] = d.IN_ROW, e.insertionMode = d.IN_ROW, ar(e, t);
        break;
      }
      default:
        e.tmplInsertionModeStack[0] = d.IN_BODY, e.insertionMode = d.IN_BODY, ie(e, t);
    }
  }
  function VA(e, t) {
    t.tagID === a.TEMPLATE && ct(e, t);
  }
  function Li(e, t) {
    e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : Sa(e, t);
  }
  function ZA(e, t) {
    t.tagID === a.HTML ? ie(e, t) : er(e, t);
  }
  function Oi(e, t) {
    var u;
    if (t.tagID === a.HTML) {
      if (e.fragmentContext || (e.insertionMode = d.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === a.HTML) {
        e._setEndLocation(e.openElements.items[0], t);
        let r = e.openElements.items[1];
        r && !(!((u = e.treeAdapter.getNodeSourceCodeLocation(r)) === null || u === void 0) && u.endTag) && e._setEndLocation(r, t);
      }
    } else er(e, t);
  }
  function er(e, t) {
    e.insertionMode = d.IN_BODY, tr(e, t);
  }
  function XA(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.FRAMESET: {
        e._insertElement(t, E.HTML);
        break;
      }
      case a.FRAME: {
        e._appendElement(t, E.HTML), t.ackSelfClosing = true;
        break;
      }
      case a.NOFRAMES: {
        Se(e, t);
        break;
      }
      default:
    }
  }
  function jA(e, t) {
    t.tagID === a.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== a.FRAMESET && (e.insertionMode = d.AFTER_FRAMESET));
  }
  function zA(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.NOFRAMES: {
        Se(e, t);
        break;
      }
      default:
    }
  }
  function $A(e, t) {
    t.tagID === a.HTML && (e.insertionMode = d.AFTER_AFTER_FRAMESET);
  }
  function ed(e, t) {
    t.tagID === a.HTML ? ie(e, t) : zu(e, t);
  }
  function zu(e, t) {
    e.insertionMode = d.IN_BODY, tr(e, t);
  }
  function td(e, t) {
    switch (t.tagID) {
      case a.HTML: {
        ie(e, t);
        break;
      }
      case a.NOFRAMES: {
        Se(e, t);
        break;
      }
      default:
    }
  }
  function ud(e, t) {
    t.chars = v, e._insertCharacters(t);
  }
  function rd(e, t) {
    e._insertCharacters(t), e.framesetOk = false;
  }
  function wi(e) {
    for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== E.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); ) e.openElements.pop();
  }
  function ad(e, t) {
    if (ga(t)) wi(e), e._startTagOutsideForeignContent(t);
    else {
      let u = e._getAdjustedCurrentElement(), r = e.treeAdapter.getNamespaceURI(u);
      r === E.MATHML ? Zu(t) : r === E.SVG && (Ta(t), Xu(t)), jt(t), t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r), t.ackSelfClosing = true;
    }
  }
  function id(e, t) {
    if (t.tagID === a.P || t.tagID === a.BR) {
      wi(e), e._endTagOutsideForeignContent(t);
      return;
    }
    for (let u = e.openElements.stackTop; u > 0; u--) {
      let r = e.openElements.items[u];
      if (e.treeAdapter.getNamespaceURI(r) === E.HTML) {
        e._endTagOutsideForeignContent(t);
        break;
      }
      let i = e.treeAdapter.getTagName(r);
      if (i.toLowerCase() === t.tagName) {
        t.tagName = i, e.openElements.shortenToLength(u);
        break;
      }
    }
  }
  var Sh = String.prototype.codePointAt == null ? (e, t) => (e.charCodeAt(t) & 64512) === 55296 ? (e.charCodeAt(t) - 55296) * 1024 + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t) : (e, t) => e.codePointAt(t);
  function ki(e, t) {
    return function(r) {
      let i, n = 0, s = "";
      for (; i = e.exec(r); ) n !== i.index && (s += r.substring(n, i.index)), s += t.get(i[0].charCodeAt(0)), n = i.index + 1;
      return s + r.substring(n);
    };
  }
  var Fi = ki(/["&\u00A0]/g, /* @__PURE__ */ new Map([[34, "&quot;"], [38, "&amp;"], [160, "&nbsp;"]])), Mi = ki(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [160, "&nbsp;"]]));
  var nd = /* @__PURE__ */ new Set([h.AREA, h.BASE, h.BASEFONT, h.BGSOUND, h.BR, h.COL, h.EMBED, h.FRAME, h.HR, h.IMG, h.INPUT, h.KEYGEN, h.LINK, h.META, h.PARAM, h.SOURCE, h.TRACK, h.WBR]);
  function sd(e, t) {
    return t.treeAdapter.isElementNode(e) && t.treeAdapter.getNamespaceURI(e) === E.HTML && nd.has(t.treeAdapter.getTagName(e));
  }
  var cd = { treeAdapter: Ie, scriptingEnabled: true };
  function ya(e, t) {
    let u = L(L({}, cd), t);
    return Pi(e, u);
  }
  function od(e, t) {
    let u = "", r = t.treeAdapter.isElementNode(e) && t.treeAdapter.getTagName(e) === h.TEMPLATE && t.treeAdapter.getNamespaceURI(e) === E.HTML ? t.treeAdapter.getTemplateContent(e) : e, i = t.treeAdapter.getChildNodes(r);
    if (i) for (let n of i) u += Pi(n, t);
    return u;
  }
  function Pi(e, t) {
    return t.treeAdapter.isElementNode(e) ? Ad(e, t) : t.treeAdapter.isTextNode(e) ? ld(e, t) : t.treeAdapter.isCommentNode(e) ? fd(e, t) : t.treeAdapter.isDocumentTypeNode(e) ? hd(e, t) : "";
  }
  function Ad(e, t) {
    let u = t.treeAdapter.getTagName(e);
    return "<".concat(u).concat(dd(e, t), ">").concat(sd(e, t) ? "" : "".concat(od(e, t), "</").concat(u, ">"));
  }
  function dd(e, { treeAdapter: t }) {
    let u = "";
    for (let r of t.getAttrList(e)) {
      if (u += " ", r.namespace) switch (r.namespace) {
        case E.XML: {
          u += "xml:".concat(r.name);
          break;
        }
        case E.XMLNS: {
          r.name !== "xmlns" && (u += "xmlns:"), u += r.name;
          break;
        }
        case E.XLINK: {
          u += "xlink:".concat(r.name);
          break;
        }
        default:
          u += "".concat(r.prefix, ":").concat(r.name);
      }
      else u += r.name;
      u += '="'.concat(Fi(r.value), '"');
    }
    return u;
  }
  function ld(e, t) {
    let { treeAdapter: u } = t, r = u.getTextNodeContent(e), i = u.getParentNode(e), n = i && u.isElementNode(i) && u.getTagName(i);
    return n && u.getNamespaceURI(i) === E.HTML && pa(n, t.scriptingEnabled) ? r : Mi(r);
  }
  function fd(e, { treeAdapter: t }) {
    return "<!--".concat(t.getCommentNodeContent(e), "-->");
  }
  function hd(e, { treeAdapter: t }) {
    return "<!DOCTYPE ".concat(t.getDocumentTypeNodeName(e), ">");
  }
  function vi(e, t) {
    return Ct.parse(e, t);
  }
  function Ui(e, t, u) {
    typeof e == "string" && (u = t, t = e, e = null);
    let r = Ct.getFragmentParser(e, u);
    return r.tokenizer.write(t, true), r.getFragment();
  }
  function Hi(e) {
    let t = e.includes('"') ? "'" : '"';
    return t + e + t;
  }
  function bd(e, t, u) {
    let r = "!DOCTYPE ";
    return e && (r += e), t ? r += " PUBLIC ".concat(Hi(t)) : u && (r += " SYSTEM"), u && (r += " ".concat(Hi(u))), r;
  }
  var Ue = { isCommentNode: ut, isElementNode: _, isTextNode: se, createDocument() {
    let e = new le([]);
    return e["x-mode"] = Vt.DOCUMENT_MODE.NO_QUIRKS, e;
  }, createDocumentFragment() {
    return new le([]);
  }, createElement(e, t, u) {
    let r = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
    for (let A = 0; A < u.length; A++) {
      let l = u[A].name;
      r[l] = u[A].value, i[l] = u[A].namespace, n[l] = u[A].prefix;
    }
    let s = new tt(e, r, []);
    return s.namespace = t, s["x-attribsNamespace"] = i, s["x-attribsPrefix"] = n, s;
  }, createCommentNode(e) {
    return new $e(e);
  }, createTextNode(e) {
    return new De(e);
  }, appendChild(e, t) {
    let u = e.children[e.children.length - 1];
    u && (u.next = t, t.prev = u), e.children.push(t), t.parent = e;
  }, insertBefore(e, t, u) {
    let r = e.children.indexOf(u), { prev: i } = u;
    i && (i.next = t, t.prev = i), u.prev = t, t.next = u, e.children.splice(r, 0, t), t.parent = e;
  }, setTemplateContent(e, t) {
    Ue.appendChild(e, t);
  }, getTemplateContent(e) {
    return e.children[0];
  }, setDocumentType(e, t, u, r) {
    let i = bd(t, u, r), n = e.children.find((s) => ou(s) && s.name === "!doctype");
    n ? n.data = i != null ? i : null : (n = new et("!doctype", i), Ue.appendChild(e, n)), n["x-name"] = t, n["x-publicId"] = u, n["x-systemId"] = r;
  }, setDocumentMode(e, t) {
    e["x-mode"] = t;
  }, getDocumentMode(e) {
    return e["x-mode"];
  }, detachNode(e) {
    if (e.parent) {
      let t = e.parent.children.indexOf(e), { prev: u, next: r } = e;
      e.prev = null, e.next = null, u && (u.next = r), r && (r.prev = u), e.parent.children.splice(t, 1), e.parent = null;
    }
  }, insertText(e, t) {
    let u = e.children[e.children.length - 1];
    u && se(u) ? u.data += t : Ue.appendChild(e, Ue.createTextNode(t));
  }, insertTextBefore(e, t, u) {
    let r = e.children[e.children.indexOf(u) - 1];
    r && se(r) ? r.data += t : Ue.insertBefore(e, Ue.createTextNode(t), u);
  }, adoptAttributes(e, t) {
    for (let u = 0; u < t.length; u++) {
      let r = t[u].name;
      e.attribs[r] === void 0 && (e.attribs[r] = t[u].value, e["x-attribsNamespace"][r] = t[u].namespace, e["x-attribsPrefix"][r] = t[u].prefix);
    }
  }, getFirstChild(e) {
    return e.children[0];
  }, getChildNodes(e) {
    return e.children;
  }, getParentNode(e) {
    return e.parent;
  }, getAttrList(e) {
    return e.attributes;
  }, getTagName(e) {
    return e.name;
  }, getNamespaceURI(e) {
    return e.namespace;
  }, getTextNodeContent(e) {
    return e.data;
  }, getCommentNodeContent(e) {
    return e.data;
  }, getDocumentTypeNodeName(e) {
    var t;
    return (t = e["x-name"]) !== null && t !== void 0 ? t : "";
  }, getDocumentTypeNodePublicId(e) {
    var t;
    return (t = e["x-publicId"]) !== null && t !== void 0 ? t : "";
  }, getDocumentTypeNodeSystemId(e) {
    var t;
    return (t = e["x-systemId"]) !== null && t !== void 0 ? t : "";
  }, isDocumentTypeNode(e) {
    return ou(e) && e.name === "!doctype";
  }, setNodeSourceCodeLocation(e, t) {
    t && (e.startIndex = t.startOffset, e.endIndex = t.endOffset), e.sourceCodeLocation = t;
  }, getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  }, updateNodeSourceCodeLocation(e, t) {
    t.endOffset != null && (e.endIndex = t.endOffset), e.sourceCodeLocation = L(L({}, e.sourceCodeLocation), t);
  } };
  function Qi(e, t, u, r) {
    var i;
    return (i = t.treeAdapter) !== null && i !== void 0 || (t.treeAdapter = Ue), t.scriptingEnabled !== false && (t.scriptingEnabled = true), u ? vi(e, t) : Ui(r, e, t);
  }
  var md = { treeAdapter: Ue };
  function Yi(e) {
    let t = "length" in e ? e : [e];
    for (let r = 0; r < t.length; r += 1) {
      let i = t[r];
      me(i) && Array.prototype.splice.call(t, r, 1, ...i.children);
    }
    let u = "";
    for (let r = 0; r < t.length; r += 1) {
      let i = t[r];
      u += ya(i, md);
    }
    return u;
  }
  var Ed = Y0((e, t, u, r) => t._useHtmlParser2 ? A0(e, t) : Qi(e, t, u, r)), pd = Z0(Ed, (e, t) => t._useHtmlParser2 ? hu(e, t) : Yi(e));
  var Ra = typeof self < "u" ? self : typeof globalThis < "u" ? globalThis : void 0, Gi = Ba, J = null;
  function Re(e) {
    Ra.postMessage(e);
  }
  function ir(e, t) {
    var u;
    try {
      return e.getString(t);
    } catch (r) {
      try {
        return String((u = e.dump(t)) != null ? u : "");
      } catch (i) {
        return "";
      }
    }
  }
  function gd(e, t = 4, u = 1e4) {
    var $;
    var r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), n = 0, s = 0, A = Gi.load || (($ = Gi.default) == null ? void 0 : $.load);
    if (typeof A != "function") throw new Error("Cheerio load is unavailable");
    function l(w) {
      if (r.size >= t) throw new Error("Plugin DOM document quota exceeded");
      var C = "d" + ++n;
      return r.set(C, A(String(w || ""), { decodeEntities: false })), C;
    }
    function f(w, C) {
      if (!C) return "";
      if (i.size >= u) throw new Error("Plugin DOM element quota exceeded");
      var O = "e" + ++s;
      return i.set(O, { documentId: w, node: C }), O;
    }
    function m(w) {
      return i.get(String(w || ""));
    }
    function T(w, C) {
      return (C || []).map((O) => f(w, O)).filter(Boolean);
    }
    function I(w, C) {
      return (C || []).map((O) => m(O)).filter((O) => O && O.documentId === w).map((O) => O.node);
    }
    function x(w, C) {
      var O = r.get(w);
      if (!O) return "";
      var H = (q) => String(q != null ? q : "").replace(/\s+/g, " ").trim();
      return I(w, C).map((q) => H(O(q).text())).join(" ");
    }
    function S(w, C) {
      var O = r.get(w);
      if (!O) return "";
      var H = m(C);
      return C ? H && O(H.node).html() || "" : O.html() || "";
    }
    function U(w, C) {
      switch (w) {
        case "load":
          return l(C[0]);
        case "select":
          try {
            var O = r.get(C[0]);
            return O ? JSON.stringify(T(C[0], O(C[1] || "").toArray())) : "[]";
          } catch (nr) {
            return "[]";
          }
        case "find":
          try {
            var H = r.get(C[0]), q = m(C[1]);
            return H ? JSON.stringify(T(C[0], q ? H(q.node).find(C[2] || "").toArray() : [])) : "[]";
          } catch (nr) {
            return "[]";
          }
        case "text":
          return x(C[0], String(C[1] || "").split(",").filter(Boolean));
        case "html":
          return S(C[0], C[1]);
        case "innerHtml": {
          var ee = r.get(C[0]), He = m(C[1]);
          return ee && He && ee(He.node).html() || "";
        }
        case "attr": {
          var Ce = r.get(C[0]), xt = m(C[1]);
          if (!Ce || !xt) return "__UNDEFINED__";
          var je = Ce(xt.node).attr(C[2]);
          return je == null || je === "" ? "__UNDEFINED__" : String(je);
        }
        case "next": {
          var Le = m(C[1]), Nt = r.get(C[0]);
          if (!Nt || !Le) return "__NONE__";
          var St = Nt(Le.node).next().get(0);
          return St && f(C[0], St) || "__NONE__";
        }
        case "prev": {
          var y = m(C[1]), Y = r.get(C[0]);
          if (!Y || !y) return "__NONE__";
          var M = Y(y.node).prev().get(0);
          return M && f(C[0], M) || "__NONE__";
        }
        case "parent": {
          var G = m(C[1]), te = r.get(C[0]);
          if (!te || !G) return "__NONE__";
          var fe = te(G.node).parent().get(0);
          return fe && f(C[0], fe) || "__NONE__";
        }
        case "children":
          try {
            var Dt = r.get(C[0]), he = m(C[1]);
            return !Dt || !he ? "[]" : JSON.stringify(T(C[0], Dt(he.node).children().toArray()));
          } catch (nr) {
            return "[]";
          }
        case "filter":
          try {
            return JSON.stringify(T(C[0], r.get(C[0])(I(C[0], String(C[1] || "").split(",").filter(Boolean))).filter(C[2] || "").toArray()));
          } catch (nr) {
            return "[]";
          }
        case "eq": {
          var be = String(C[1] || "").split(",").filter(Boolean), yt = Number(C[2]);
          return yt >= 0 && yt < be.length ? be[yt] : "";
        }
        default:
          return "";
      }
    }
    return function(C) {
      var O = ["load", "select", "find", "text", "html", "innerHtml", "attr", "next", "prev", "parent", "children", "filter", "eq"];
      O.forEach((H) => {
        var q = C.newFunction("__cheerio_" + H, (...ee) => {
          var He;
          return C.newString(String((He = U(H, ee.map((Ce) => ir(C, Ce)))) != null ? He : ""));
        });
        q.consume((ee) => C.setProp(C.global, "__cheerio_" + H, ee));
      }), e.disposeCheerio = function() {
        r.clear(), i.clear();
      };
    };
  }
  function Td() {
    return "\n    (function() {\n    // Capture the host bridge in this trusted closure. The names installed by\n    // the host are removed immediately after this polyfill is evaluated, so a\n    // plugin can use the small public compatibility surface but cannot call\n    // private bridge functions directly.\n    var __nuvioNativeFetch = __native_fetch;\n    var __nuvioNativeCancel = __native_cancel;\n    var __nuvioNativeLog = __native_log;\n    var __nuvioFetchCounter = 0;\n    var __nuvioParseUrl = __parse_url;\n    var __nuvioCheerioLoad = __cheerio_load;\n    var __nuvioCheerioSelect = __cheerio_select;\n    var __nuvioCheerioFind = __cheerio_find;\n    var __nuvioCheerioText = __cheerio_text;\n    var __nuvioCheerioHtml = __cheerio_html;\n    var __nuvioCheerioInnerHtml = __cheerio_innerHtml;\n    var __nuvioCheerioAttr = __cheerio_attr;\n    var __nuvioCheerioNext = __cheerio_next;\n    var __nuvioCheerioPrev = __cheerio_prev;\n    var __nuvioCheerioParent = __cheerio_parent;\n    var __nuvioCheerioChildren = __cheerio_children;\n    var __nuvioCheerioFilter = __cheerio_filter;\n    var __nuvioCheerioEq = __cheerio_eq;\n\n    globalThis.global = globalThis;\n    globalThis.window = globalThis;\n    globalThis.self = globalThis;\n    function __nuvioFormatLogValue(value) {\n      try {\n        if (value && value.stack) return String(value.stack);\n      } catch (_) {}\n      if (value === undefined) return 'undefined';\n      if (value === null) return 'null';\n      if (typeof value === 'string') return value;\n      try {\n        var json = JSON.stringify(value);\n        return json === undefined ? String(value) : json;\n      } catch (_) {\n        return String(value);\n      }\n    }\n    function __nuvioForwardPluginLog(level, args) {\n      var values = [];\n      for (var i = 0; i < args.length; i++) values.push(__nuvioFormatLogValue(args[i]));\n      try { __nuvioNativeLog(level, values.join(' ')); } catch (_) {}\n    }\n    // Keep provider info/debug logs quiet, but forward warnings and errors to\n    // the host. The host writes them through console.warn/error so they are\n    // visible in Inspector and in Settings > Console debug.\n    globalThis.console = {\n      log: function() {},\n      info: function() {},\n      warn: function() { __nuvioForwardPluginLog('warn', arguments); },\n      error: function() { __nuvioForwardPluginLog('error', arguments); },\n      debug: function() {}\n    };\n    globalThis.SCRAPER_ID = __get_scraper_id();\n    globalThis.SCRAPER_SETTINGS = JSON.parse(__get_scraper_settings());\n    globalThis.TMDB_API_KEY = __get_tmdb_api_key();\n\n    var fetch = function(url, options) {\n      options = options || {};\n      var method = String(options.method || 'GET').toUpperCase();\n      var headers = options.headers || {};\n      var body = options.body || '';\n      var signal = options.signal;\n      if (signal && signal.aborted) { var before = new Error('The operation was aborted.'); before.name = 'AbortError'; return Promise.reject(before); }\n      if (!headers['User-Agent']) headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';\n      var abortToken = signal ? 'fetch-' + (++__nuvioFetchCounter) : '';\n      var abortListener = abortToken ? function() { try { __nuvioNativeCancel(abortToken); } catch (_) {} } : null;\n      var cleanup = function() { if (signal && abortListener) signal.removeEventListener('abort', abortListener); };\n      if (signal && abortListener) signal.addEventListener('abort', abortListener);\n      return __nuvioNativeFetch(JSON.stringify({ url: String(url && url.href || url || ''), method: method, headers: headers, body: String(body) }), abortToken).then(function(raw) {\n        cleanup();\n        var payload = JSON.parse(raw);\n        if (signal && signal.aborted) { var after = new Error('The operation was aborted.'); after.name = 'AbortError'; return Promise.reject(after); }\n        return {\n          ok: payload.ok,\n          status: payload.status,\n          statusText: payload.statusText,\n          url: payload.url,\n          headers: {\n            get: function(name) {\n              return payload.headers && payload.headers[String(name || '').toLowerCase()] || null;\n            }\n          },\n          text: function() { return Promise.resolve(payload.body); },\n          json: function() {\n            try {\n              if (payload.body === null || payload.body === undefined || payload.body === '') return Promise.resolve(null);\n              return Promise.resolve(JSON.parse(payload.body));\n            } catch (_) {\n              console.error('fetch.json parse error:', _ && _.message ? _.message : _);\n              return Promise.resolve(null);\n            }\n          }\n        };\n      }, function(error) {\n        cleanup();\n        throw error;\n      });\n    };\n    globalThis.fetch = fetch;\n    if (typeof AbortSignal === 'undefined') {\n      globalThis.AbortSignal = function() { this.aborted = false; this.reason = undefined; this._listeners = []; };\n      AbortSignal.prototype.addEventListener = function(type, fn) { if (type === 'abort' && typeof fn === 'function') this._listeners.push(fn); };\n      AbortSignal.prototype.removeEventListener = function(type, fn) { if (type === 'abort') this._listeners = this._listeners.filter(function(entry) { return entry !== fn; }); };\n      AbortSignal.prototype.dispatchEvent = function(event) { if (!event || event.type !== 'abort') return true; this._listeners.slice().forEach(function(fn) { try { fn.call(this, event); } catch (_) {} }, this); return true; };\n    }\n    if (typeof AbortController === 'undefined') {\n      globalThis.AbortController = function() { this.signal = new AbortSignal(); };\n      AbortController.prototype.abort = function(reason) { if (this.signal.aborted) return; this.signal.aborted = true; this.signal.reason = reason; this.signal.dispatchEvent({ type: 'abort' }); };\n    }\n    if (typeof atob === 'undefined') globalThis.atob = function(input) { var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; var str = String(input).replace(/=+$/, ''); if (str.length % 4 === 1) throw new Error('InvalidCharacterError'); var output = ''; var bc = 0; var bs; var buffer; var idx = 0; while ((buffer = str.charAt(idx++))) { buffer = chars.indexOf(buffer); if (buffer === -1) continue; bs = bc % 4 ? bs * 64 + buffer : buffer; if (bc++ % 4) output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))); } return output; };\n    if (typeof btoa === 'undefined') globalThis.btoa = function(input) { var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; var str = String(input); var output = ''; for (var block, charCode, idx = 0, map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & (block >> (8 - (idx % 1) * 8)))) { charCode = str.charCodeAt(idx += 3 / 4); if (charCode > 0xFF) throw new Error('InvalidCharacterError'); block = (block << 8) | charCode; } return output; };\n    var URL = function(url, base) {\n      var urlString = String(url && url.href || url || '');\n      var fullUrl = urlString;\n      if (base && !new RegExp('^https?://', 'i').test(urlString)) {\n        var baseString = typeof base === 'string' ? base : base.href;\n        if (urlString.charAt(0) === '/') {\n          var originMatch = baseString.match(new RegExp('^(https?://[^/]+)'));\n          fullUrl = originMatch ? originMatch[1] + urlString : urlString;\n        } else {\n          fullUrl = baseString.replace(new RegExp('/[^/]*$'), '/') + urlString;\n        }\n      }\n      var parsed = JSON.parse(__nuvioParseUrl(fullUrl));\n      this.href = fullUrl; this.protocol = parsed.protocol; this.host = parsed.host; this.hostname = parsed.hostname; this.port = parsed.port; this.pathname = parsed.pathname; this.search = parsed.search; this.hash = parsed.hash;\n      this.origin = parsed.protocol + '//' + parsed.host;\n      this.searchParams = new URLSearchParams(parsed.search);\n    };\n    globalThis.URL = URL;\n    URL.prototype.toString = function() { return this.href; };\n    var URLSearchParams = function(init) {\n      this._params = {};\n      var self = this;\n      if (init && typeof init === 'object' && !Array.isArray(init)) {\n        Object.keys(init).forEach(function(key) { self._params[key] = String(init[key]); });\n      } else if (typeof init === 'string') {\n        init.replace(/^\\?/, '').split('&').forEach(function(pair) {\n          var parts = pair.split('=');\n          if (parts[0]) self._params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');\n        });\n      }\n    };\n    globalThis.URLSearchParams = URLSearchParams;\n    URLSearchParams.prototype.toString = function() { var self = this; return Object.keys(this._params).map(function(key) { return encodeURIComponent(key) + '=' + encodeURIComponent(self._params[key]); }).join('&'); };\n    URLSearchParams.prototype.get = function(key) { return this._params.hasOwnProperty(key) ? this._params[key] : null; };\n    URLSearchParams.prototype.set = function(key, value) { this._params[key] = String(value); };\n    URLSearchParams.prototype.append = function(key, value) { this._params[key] = String(value); };\n    URLSearchParams.prototype.has = function(key) { return this._params.hasOwnProperty(key); };\n    URLSearchParams.prototype.delete = function(key) { delete this._params[key]; };\n    URLSearchParams.prototype.keys = function() { return Object.keys(this._params); };\n    URLSearchParams.prototype.values = function() { var self = this; return Object.keys(this._params).map(function(key) { return self._params[key]; }); };\n    URLSearchParams.prototype.entries = function() { var self = this; return Object.keys(this._params).map(function(key) { return [key, self._params[key]]; }); };\n    URLSearchParams.prototype.forEach = function(callback) { var self = this; Object.keys(this._params).forEach(function(key) { callback(self._params[key], key, self); }); };\n    URLSearchParams.prototype.getAll = function(key) { return this._params.hasOwnProperty(key) ? [this._params[key]] : []; };\n    URLSearchParams.prototype.sort = function() { var sorted = {}; var self = this; Object.keys(this._params).sort().forEach(function(key) { sorted[key] = self._params[key]; }); this._params = sorted; };\n\n    function __nuvioWrap(docId, ids) {\n      ids = ids || [];\n      var wrapper = { _docId: docId, _elementIds: ids, length: ids.length };\n      wrapper.each = function(callback) { for (var i = 0; i < ids.length; i++) { var item = __nuvioWrap(docId, [ids[i]]); callback.call(item, i, item); } return wrapper; };\n      wrapper.find = function(selector) { var allIds = []; for (var i = 0; i < ids.length; i++) { var found = JSON.parse(__nuvioCheerioFind(docId, ids[i], selector)); allIds = allIds.concat(found); } return __nuvioWrap(docId, allIds); };\n      wrapper.text = function() { if (ids.length === 0) return ''; return __nuvioCheerioText(docId, ids.join(',')); };\n      wrapper.html = function() { if (ids.length === 0) return ''; return __nuvioCheerioInnerHtml(docId, ids[0]); };\n      wrapper.attr = function(name) { if (ids.length === 0) return undefined; var value = __nuvioCheerioAttr(docId, ids[0], name); return value === '__UNDEFINED__' ? undefined : value; };\n      wrapper.first = function() { return __nuvioWrap(docId, ids.length > 0 ? [ids[0]] : []); };\n      wrapper.last = function() { return __nuvioWrap(docId, ids.length > 0 ? [ids[ids.length - 1]] : []); };\n      wrapper.next = function() { var nextIds = []; for (var i = 0; i < ids.length; i++) { var nextId = __nuvioCheerioNext(docId, ids[i]); if (nextId && nextId !== '__NONE__') nextIds.push(nextId); } return __nuvioWrap(docId, nextIds); };\n      wrapper.prev = function() { var prevIds = []; for (var i = 0; i < ids.length; i++) { var prevId = __nuvioCheerioPrev(docId, ids[i]); if (prevId && prevId !== '__NONE__') prevIds.push(prevId); } return __nuvioWrap(docId, prevIds); };\n      wrapper.eq = function(index) { if (index >= 0 && index < ids.length) return __nuvioWrap(docId, [ids[index]]); return __nuvioWrap(docId, []); };\n      wrapper.get = function(index) { if (typeof index === 'number') { if (index >= 0 && index < ids.length) return __nuvioWrap(docId, [ids[index]]); return undefined; } return ids.map(function(id) { return __nuvioWrap(docId, [id]); }); };\n      wrapper.map = function(callback) { var values = []; for (var i = 0; i < ids.length; i++) { var item = __nuvioWrap(docId, [ids[i]]); var value = callback.call(item, i, item); if (value !== undefined && value !== null) values.push(value); } return { length: values.length, get: function(index) { return typeof index === 'number' ? values[index] : values; }, toArray: function() { return values; } }; };\n      wrapper.filter = function(selectorOrCallback) { if (typeof selectorOrCallback !== 'function') return wrapper; var filtered = []; for (var i = 0; i < ids.length; i++) { var item = __nuvioWrap(docId, [ids[i]]); if (selectorOrCallback.call(item, i, item)) filtered.push(ids[i]); } return __nuvioWrap(docId, filtered); };\n      wrapper.children = function(selector) { return wrapper.find(selector || '*'); };\n      wrapper.parent = function() { return __nuvioWrap(docId, []); };\n      wrapper.toArray = function() { return ids.map(function(id) { return __nuvioWrap(docId, [id]); }); };\n      return wrapper;\n    }\n    function __nuvioLoad(html) {\n      var docId = __nuvioCheerioLoad(String(html || ''));\n      var $ = function(selector, context) {\n        if (selector && selector._elementIds) return selector;\n        if (context && context._elementIds && context._elementIds.length > 0) {\n          var contextIds = [];\n          for (var i = 0; i < context._elementIds.length; i++) {\n            JSON.parse(__nuvioCheerioFind(docId, context._elementIds[i], selector)).forEach(function(id) { contextIds.push(id); });\n          }\n          return __nuvioWrap(docId, contextIds);\n        }\n        return __nuvioWrap(docId, JSON.parse(__nuvioCheerioSelect(docId, String(selector || ''))));\n      };\n      $.html = function(element) { return element && element._elementIds && element._elementIds.length > 0 ? __nuvioCheerioHtml(docId, element._elementIds[0]) : __nuvioCheerioHtml(docId, ''); };\n      return $;\n    }\n    var cheerio = { load: __nuvioLoad };\n    var require = function(name) { if (name === 'cheerio' || name === 'cheerio-without-node-native' || name === 'react-native-cheerio') return cheerio; if (name === 'crypto-js') return globalThis.CryptoJS; throw new Error('Module not allowed: ' + name); };\n    // Android exposes these as top-level compatibility bindings. Publish only\n    // the lowercase module/function names that providers can use there; do not\n    // add browser-only constructor globals such as Headers, Response or\n    // Cheerio.\n    globalThis.cheerio = cheerio;\n    globalThis.require = require;\n    if (!Array.prototype.flat) {\n      Array.prototype.flat = function(depth) {\n        depth = depth === undefined ? 1 : Math.floor(depth);\n        if (depth < 1) return Array.prototype.slice.call(this);\n        return (function flatten(arr, currentDepth) {\n          return currentDepth > 0 ? arr.reduce(function(acc, value) {\n            return acc.concat(Array.isArray(value) ? flatten(value, currentDepth - 1) : value);\n          }, []) : arr.slice();\n        })(this, depth);\n      };\n    }\n    if (!Array.prototype.flatMap) {\n      Array.prototype.flatMap = function(callback, thisArg) {\n        return this.map(callback, thisArg).flat();\n      };\n    }\n    if (!Object.entries) {\n      Object.entries = function(object) {\n        var result = [];\n        for (var key in object) if (Object.prototype.hasOwnProperty.call(object, key)) result.push([key, object[key]]);\n        return result;\n      };\n    }\n    if (!Object.fromEntries) {\n      Object.fromEntries = function(entries) {\n        var result = {};\n        for (var i = 0; i < entries.length; i++) result[entries[i][0]] = entries[i][1];\n        return result;\n      };\n    }\n    if (!String.prototype.replaceAll) {\n      String.prototype.replaceAll = function(search, replacement) {\n        if (search instanceof RegExp) {\n          if (!search.global) throw new TypeError('replaceAll must be called with a global RegExp');\n          return this.replace(search, replacement);\n        }\n        return this.split(search).join(replacement);\n      };\n    }\n    // Keep the standard JavaScript dynamic-code APIs available inside this\n    // isolated QuickJS context. Android providers use eval/Function for\n    // deobfuscation; isolation is provided by the dedicated context and the\n    // bridge cleanup above, not by rejecting valid JavaScript syntax.\n    })();\n  ";
  }
  async function Id(e, t, u, r) {
    var A;
    let i = false, n = null;
    e.resolvePromise(u).then((l) => {
      i = true, n = l;
    }, (l) => {
      i = true, n = l;
    });
    let s = Date.now();
    for (; !i && Date.now() - s < Number(r || 6e4); ) {
      let l = t.executePendingJobs();
      if (l != null && l.error) {
        let f = e.unwrapResult(l), m = String(((A = e.dump(f)) == null ? void 0 : A.message) || "QuickJS pending job failed");
        throw f.dispose(), new Error(m);
      }
      await new Promise((f) => setTimeout(f, 0));
    }
    if (!i) throw new Error("Plugin promise timed out");
    return n;
  }
  async function Cd(e) {
    var Nt, St;
    importScripts("../libs/quickjs-emscripten.global.js");
    var t = Ra.QJS;
    if (!t || typeof t.getQuickJS != "function") throw new Error("QuickJS WASM asset unavailable");
    var u = e || {}, r = u.quota || {}, i = { pending: /* @__PURE__ */ new Map(), abortTokens: /* @__PURE__ */ new Map(), requestCounter: 0, disposeCheerio: null, context: null, settleFetch: null, rejectPending: null };
    J = i;
    var n = await t.getQuickJS(), s = n.newContext({ intrinsics: { BaseObjects: true, Date: true, Eval: true, StringNormalize: true, RegExp: true, JSON: true, Proxy: true, MapSet: true, TypedArrays: true, Promise: true, BigInt: true } }), A = s.runtime;
    i.context = s, (Nt = A.setMemoryLimit) == null || Nt.call(A, Number(r.memoryLimitBytes || 32 * 1024 * 1024));
    var l = Number(u.deadline) || Date.now() + Number(u.timeoutMs || 6e4);
    (St = A.setInterruptHandler) == null || St.call(A, () => Date.now() > l);
    function f(y, Y) {
      var M = s.newFunction(y, (...G) => {
        var te;
        return s.newString(String((te = Y(...G.map((fe) => ir(s, fe)))) != null ? te : ""));
      });
      M.consume((G) => s.setProp(s.global, y, G));
    }
    f("__get_scraper_id", () => String(u.scraperId || "")), f("__get_scraper_settings", () => JSON.stringify(u.settings || {})), f("__get_tmdb_api_key", () => String(u.tmdbApiKey || "")), f("__native_log", (y, Y) => (Re({ type: "pluginLog", level: String(y || "").toLowerCase() === "error" ? "error" : "warn", message: String(Y || "").slice(0, 4e3) }), "")), f("__native_cancel", (y) => {
      var Y = i.abortTokens.get(String(y || ""));
      return Y ? (Re({ type: "cancel", requestId: Y }), true) : false;
    }), f("__parse_url", (y, Y) => {
      try {
        var M = new URL(String(y || ""), String(Y || "") || void 0);
        return JSON.stringify({ href: M.href, protocol: M.protocol, host: M.host, hostname: M.hostname, port: M.port, pathname: M.pathname, search: M.search, hash: M.hash });
      } catch (G) {
        return JSON.stringify({ href: String(y || ""), protocol: "", host: "", hostname: "", port: "", pathname: "/", search: "", hash: "" });
      }
    }), gd(i, Math.max(1, Number(r.maxDocuments || 4)), Math.max(100, Number(r.maxDomElements || 1e4)))(s);
    function m(y, Y, M) {
      var G = i.pending.get(y);
      if (G) {
        i.pending.delete(y), G.abortToken && i.abortTokens.delete(G.abortToken);
        try {
          if (M) {
            var te = s.newError(M);
            try {
              G.deferred.reject(te);
            } finally {
              te.dispose();
            }
          } else {
            var fe = s.newString(JSON.stringify(Y || {}));
            try {
              G.deferred.resolve(fe);
            } finally {
              fe.dispose();
            }
          }
        } finally {
          G.deferred.dispose();
        }
      }
    }
    i.settleFetch = m, i.rejectPending = function(y) {
      Array.from(i.pending.keys()).forEach((Y) => m(Y, null, y));
    }, i.cleanup = function() {
      var Y, M, G, te, fe, Dt;
      if (!i.cleaned) {
        i.cleaned = true, (Y = i.rejectPending) == null || Y.call(i, new Error("Plugin execution ended"));
        for (let he = 0; he < 64; he += 1) {
          let be;
          try {
            be = A.executePendingJobs();
          } catch (yt) {
            break;
          }
          if (be != null && be.error) {
            try {
              s.unwrapResult(be).dispose();
            } catch (yt) {
            }
            break;
          }
          if (!Number((be == null ? void 0 : be.value) || 0)) break;
        }
        i.pending.clear();
        var y = Array.from(((G = (M = A.contextMap) == null ? void 0 : M.values) == null ? void 0 : G.call(M)) || []);
        y.forEach((he) => {
          if (!(!he || he === i.context || !he.alive)) try {
            he.dispose();
          } catch (be) {
          }
        });
        try {
          (fe = (te = i.context) == null ? void 0 : te.dispose) == null || fe.call(te);
        } catch (he) {
        }
        try {
          (Dt = i.disposeCheerio) == null || Dt.call(i);
        } catch (he) {
        }
        i.context = null, i.disposeCheerio = null;
      }
    };
    var T = s.newFunction("__native_fetch", (...y) => {
      if (i.cleaned) throw new Error("Plugin execution ended");
      var Y = JSON.parse(ir(s, y[0]) || "{}"), M = String(u.executionId || "execution") + "-" + ++i.requestCounter, G = ir(s, y[1]);
      Y.requestId = M;
      var te = s.newPromise();
      i.pending.set(M, { deferred: te, abortToken: G }), G && i.abortTokens.set(G, M);
      try {
        Re({ type: "fetch", requestId: M, payload: Y });
      } catch (fe) {
        m(M, null, fe);
      }
      return te.handle;
    });
    T.consume((y) => s.setProp(s.global, "__native_fetch", y));
    var I = Td(), x = s.evalCode(I, "nuvio-plugin-polyfill.js");
    s.unwrapResult(x).dispose();
    var S = `;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/*globals window, global, require*/

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {

	    var crypto;

	    // Native crypto from window (Browser)
	    if (typeof window !== 'undefined' && window.crypto) {
	        crypto = window.crypto;
	    }

	    // Native crypto in web worker (Browser)
	    if (typeof self !== 'undefined' && self.crypto) {
	        crypto = self.crypto;
	    }

	    // Native crypto from worker
	    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
	        crypto = globalThis.crypto;
	    }

	    // Native (experimental IE 11) crypto from window (Browser)
	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
	        crypto = window.msCrypto;
	    }

	    // Native crypto from global (NodeJS)
	    if (!crypto && typeof global !== 'undefined' && global.crypto) {
	        crypto = global.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && typeof require === 'function') {
	        try {
	            crypto = require('crypto');
	        } catch (err) {}
	    }

	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
	        if (crypto) {
	            // Use getRandomValues method (Browser)
	            if (typeof crypto.getRandomValues === 'function') {
	                try {
	                    return crypto.getRandomValues(new Uint32Array(1))[0];
	                } catch (err) {}
	            }

	            // Use randomBytes method (NodeJS)
	            if (typeof crypto.randomBytes === 'function') {
	                try {
	                    return crypto.randomBytes(4).readInt32LE();
	                } catch (err) {}
	            }
	        }

	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };

	    /*
	     * Local polyfill of Object.create

	     */
	    var create = Object.create || (function () {
	        function F() {}

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var j = 0; j < thatSigBytes; j += 4) {
	                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;

	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	(function () {
	    // Check if typed arrays are supported
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }

	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;

	    // Reference original init
	    var superInit = WordArray.init;

	    // Augment WordArray.init to handle typed arrays
	    var subInit = WordArray.init = function (typedArray) {
	        // Convert buffers to uint8
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }

	        // Convert other array views to uint8
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }

	        // Handle Uint8Array
	        if (typedArray instanceof Uint8Array) {
	            // Shortcut
	            var typedArrayByteLength = typedArray.byteLength;

	            // Extract bytes
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }

	            // Initialize this word array
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            // Else call normal init
	            superInit.apply(this, arguments);
	        }
	    };

	    subInit.prototype = WordArray;
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              var bitsCombined = bits1 | bits2;
	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64url encoding strategy.
	     */
	    var Base64url = C_enc.Base64url = {
	        /**
	         * Converts a word array to a Base64url string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @param {boolean} urlSafe Whether to use url safe
	         *
	         * @return {string} The Base64url string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
	         */
	        stringify: function (wordArray, urlSafe) {
	            if (urlSafe === undefined) {
	                urlSafe = true
	            }
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = urlSafe ? this._safe_map : this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64url string to a word array.
	         *
	         * @param {string} base64Str The Base64url string.
	         *
	         * @param {boolean} urlSafe Whether to use url safe
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
	         */
	        parse: function (base64Str, urlSafe) {
	            if (urlSafe === undefined) {
	                urlSafe = true
	            }

	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = urlSafe ? this._safe_map : this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                reverseMap = this._reverseMap = [];
	                for (var j = 0; j < map.length; j++) {
	                    reverseMap[map.charCodeAt(j)] = j;
	                }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	        _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	        var words = [];
	        var nBytes = 0;
	        for (var i = 0; i < base64StrLength; i++) {
	            if (i % 4) {
	                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	                var bitsCombined = bits1 | bits2;
	                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	                nBytes++;
	            }
	        }
	        return WordArray.create(words, nBytes);
	    }
	}());


	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;

	    /**
	     * SHA-224 hash algorithm.
	     */
	    var SHA224 = C_algo.SHA224 = SHA256.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA256._doFinalize.call(this);

	            hash.sigBytes -= 4;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA224('message');
	     *     var hash = CryptoJS.SHA224(wordArray);
	     */
	    C.SHA224 = SHA256._createHelper(SHA224);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA224(message, key);
	     */
	    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                var Wil;
	                var Wih;

	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    Wih = Wi.high = M[offset + i * 2]     | 0;
	                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    Wil = gamma0l + Wi7l;
	                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    Wil = Wil + gamma1l;
	                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    Wil = Wil + Wi16l;
	                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;

	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);

	            hash.sigBytes -= 16;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());


	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var C_algo = C.algo;

	    // Constants tables
	    var RHO_OFFSETS = [];
	    var PI_INDEXES  = [];
	    var ROUND_CONSTANTS = [];

	    // Compute Constants
	    (function () {
	        // Compute rho offset constants
	        var x = 1, y = 0;
	        for (var t = 0; t < 24; t++) {
	            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

	            var newX = y % 5;
	            var newY = (2 * x + 3 * y) % 5;
	            x = newX;
	            y = newY;
	        }

	        // Compute pi index constants
	        for (var x = 0; x < 5; x++) {
	            for (var y = 0; y < 5; y++) {
	                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
	            }
	        }

	        // Compute round constants
	        var LFSR = 0x01;
	        for (var i = 0; i < 24; i++) {
	            var roundConstantMsw = 0;
	            var roundConstantLsw = 0;

	            for (var j = 0; j < 7; j++) {
	                if (LFSR & 0x01) {
	                    var bitPosition = (1 << j) - 1;
	                    if (bitPosition < 32) {
	                        roundConstantLsw ^= 1 << bitPosition;
	                    } else /* if (bitPosition >= 32) */ {
	                        roundConstantMsw ^= 1 << (bitPosition - 32);
	                    }
	                }

	                // Compute next LFSR
	                if (LFSR & 0x80) {
	                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
	                    LFSR = (LFSR << 1) ^ 0x71;
	                } else {
	                    LFSR <<= 1;
	                }
	            }

	            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
	        }
	    }());

	    // Reusable objects for temporary values
	    var T = [];
	    (function () {
	        for (var i = 0; i < 25; i++) {
	            T[i] = X64Word.create();
	        }
	    }());

	    /**
	     * SHA-3 hash algorithm.
	     */
	    var SHA3 = C_algo.SHA3 = Hasher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} outputLength
	         *   The desired number of bits in the output hash.
	         *   Only values permitted are: 224, 256, 384, 512.
	         *   Default: 512
	         */
	        cfg: Hasher.cfg.extend({
	            outputLength: 512
	        }),

	        _doReset: function () {
	            var state = this._state = []
	            for (var i = 0; i < 25; i++) {
	                state[i] = new X64Word.init();
	            }

	            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var state = this._state;
	            var nBlockSizeLanes = this.blockSize / 2;

	            // Absorb
	            for (var i = 0; i < nBlockSizeLanes; i++) {
	                // Shortcuts
	                var M2i  = M[offset + 2 * i];
	                var M2i1 = M[offset + 2 * i + 1];

	                // Swap endian
	                M2i = (
	                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
	                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
	                );
	                M2i1 = (
	                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
	                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
	                );

	                // Absorb message into state
	                var lane = state[i];
	                lane.high ^= M2i1;
	                lane.low  ^= M2i;
	            }

	            // Rounds
	            for (var round = 0; round < 24; round++) {
	                // Theta
	                for (var x = 0; x < 5; x++) {
	                    // Mix column lanes
	                    var tMsw = 0, tLsw = 0;
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        tMsw ^= lane.high;
	                        tLsw ^= lane.low;
	                    }

	                    // Temporary values
	                    var Tx = T[x];
	                    Tx.high = tMsw;
	                    Tx.low  = tLsw;
	                }
	                for (var x = 0; x < 5; x++) {
	                    // Shortcuts
	                    var Tx4 = T[(x + 4) % 5];
	                    var Tx1 = T[(x + 1) % 5];
	                    var Tx1Msw = Tx1.high;
	                    var Tx1Lsw = Tx1.low;

	                    // Mix surrounding columns
	                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
	                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        lane.high ^= tMsw;
	                        lane.low  ^= tLsw;
	                    }
	                }

	                // Rho Pi
	                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
	                    var tMsw;
	                    var tLsw;

	                    // Shortcuts
	                    var lane = state[laneIndex];
	                    var laneMsw = lane.high;
	                    var laneLsw = lane.low;
	                    var rhoOffset = RHO_OFFSETS[laneIndex];

	                    // Rotate lanes
	                    if (rhoOffset < 32) {
	                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
	                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
	                    } else /* if (rhoOffset >= 32) */ {
	                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
	                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
	                    }

	                    // Transpose lanes
	                    var TPiLane = T[PI_INDEXES[laneIndex]];
	                    TPiLane.high = tMsw;
	                    TPiLane.low  = tLsw;
	                }

	                // Rho pi at x = y = 0
	                var T0 = T[0];
	                var state0 = state[0];
	                T0.high = state0.high;
	                T0.low  = state0.low;

	                // Chi
	                for (var x = 0; x < 5; x++) {
	                    for (var y = 0; y < 5; y++) {
	                        // Shortcuts
	                        var laneIndex = x + 5 * y;
	                        var lane = state[laneIndex];
	                        var TLane = T[laneIndex];
	                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
	                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

	                        // Mix rows
	                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
	                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
	                    }
	                }

	                // Iota
	                var lane = state[0];
	                var roundConstant = ROUND_CONSTANTS[round];
	                lane.high ^= roundConstant.high;
	                lane.low  ^= roundConstant.low;
	            }
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            var blockSizeBits = this.blockSize * 32;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
	            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var state = this._state;
	            var outputLengthBytes = this.cfg.outputLength / 8;
	            var outputLengthLanes = outputLengthBytes / 8;

	            // Squeeze
	            var hashWords = [];
	            for (var i = 0; i < outputLengthLanes; i++) {
	                // Shortcuts
	                var lane = state[i];
	                var laneMsw = lane.high;
	                var laneLsw = lane.low;

	                // Swap endian
	                laneMsw = (
	                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
	                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
	                );
	                laneLsw = (
	                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
	                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
	                );

	                // Squeeze state to retrieve hash
	                hashWords.push(laneLsw);
	                hashWords.push(laneMsw);
	            }

	            // Return final computed hash
	            return new WordArray.init(hashWords, outputLengthBytes);
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);

	            var state = clone._state = this._state.slice(0);
	            for (var i = 0; i < 25; i++) {
	                state[i] = state[i].clone();
	            }

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA3('message');
	     *     var hash = CryptoJS.SHA3(wordArray);
	     */
	    C.SHA3 = Hasher._createHelper(SHA3);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA3(message, key);
	     */
	    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	}(Math));


	/** @preserve
	(c) 2012 by C\xE9dric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var _zl = WordArray.create([
	        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
	    var _zr = WordArray.create([
	        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
	    var _sl = WordArray.create([
	         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
	    var _sr = WordArray.create([
	        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

	    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
	    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

	    /**
	     * RIPEMD160 hash algorithm.
	     */
	    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
	        _doReset: function () {
	            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
	        },

	        _doProcessBlock: function (M, offset) {

	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                // Swap
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            // Shortcut
	            var H  = this._hash.words;
	            var hl = _hl.words;
	            var hr = _hr.words;
	            var zl = _zl.words;
	            var zr = _zr.words;
	            var sl = _sl.words;
	            var sr = _sr.words;

	            // Working variables
	            var al, bl, cl, dl, el;
	            var ar, br, cr, dr, er;

	            ar = al = H[0];
	            br = bl = H[1];
	            cr = cl = H[2];
	            dr = dl = H[3];
	            er = el = H[4];
	            // Computation
	            var t;
	            for (var i = 0; i < 80; i += 1) {
	                t = (al +  M[offset+zl[i]])|0;
	                if (i<16){
		            t +=  f1(bl,cl,dl) + hl[0];
	                } else if (i<32) {
		            t +=  f2(bl,cl,dl) + hl[1];
	                } else if (i<48) {
		            t +=  f3(bl,cl,dl) + hl[2];
	                } else if (i<64) {
		            t +=  f4(bl,cl,dl) + hl[3];
	                } else {// if (i<80) {
		            t +=  f5(bl,cl,dl) + hl[4];
	                }
	                t = t|0;
	                t =  rotl(t,sl[i]);
	                t = (t+el)|0;
	                al = el;
	                el = dl;
	                dl = rotl(cl, 10);
	                cl = bl;
	                bl = t;

	                t = (ar + M[offset+zr[i]])|0;
	                if (i<16){
		            t +=  f5(br,cr,dr) + hr[0];
	                } else if (i<32) {
		            t +=  f4(br,cr,dr) + hr[1];
	                } else if (i<48) {
		            t +=  f3(br,cr,dr) + hr[2];
	                } else if (i<64) {
		            t +=  f2(br,cr,dr) + hr[3];
	                } else {// if (i<80) {
		            t +=  f1(br,cr,dr) + hr[4];
	                }
	                t = t|0;
	                t =  rotl(t,sr[i]) ;
	                t = (t+er)|0;
	                ar = er;
	                er = dr;
	                dr = rotl(cr, 10);
	                cr = br;
	                br = t;
	            }
	            // Intermediate hash value
	            t    = (H[1] + cl + dr)|0;
	            H[1] = (H[2] + dl + er)|0;
	            H[2] = (H[3] + el + ar)|0;
	            H[3] = (H[4] + al + br)|0;
	            H[4] = (H[0] + bl + cr)|0;
	            H[0] =  t;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 5; i++) {
	                // Shortcut
	                var H_i = H[i];

	                // Swap
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });


	    function f1(x, y, z) {
	        return ((x) ^ (y) ^ (z));

	    }

	    function f2(x, y, z) {
	        return (((x)&(y)) | ((~x)&(z)));
	    }

	    function f3(x, y, z) {
	        return (((x) | (~(y))) ^ (z));
	    }

	    function f4(x, y, z) {
	        return (((x) & (z)) | ((y)&(~(z))));
	    }

	    function f5(x, y, z) {
	        return ((x) ^ ((y) |(~(z))));

	    }

	    function rotl(x,n) {
	        return (x<<n) | (x>>>(32-n));
	    }


	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.RIPEMD160('message');
	     *     var hash = CryptoJS.RIPEMD160(wordArray);
	     */
	    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
	     */
	    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	}(Math));


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;
	    var HMAC = C_algo.HMAC;

	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA256
	         * @property {number} iterations The number of iterations to perform. Default: 250000
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA256,
	            iterations: 250000
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init HMAC
	            var hmac = HMAC.create(cfg.hasher, password);

	            // Initial values
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();

	                // Shortcuts
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;

	                // Iterations
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();

	                    // Shortcut
	                    var intermediateWords = intermediate.words;

	                    // XOR intermediate with block
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }

	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            var block;

	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            var block;

	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            var modeCreator;

	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            var finalProcessedBlocks;

	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            var wordArray;

	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            var salt;

	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt, hasher) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            if (!hasher) {
	                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
	            } else {
	                var key = EvpKDF.create({ keySize: keySize + ivSize, hasher: hasher }).compute(password, salt);
	            }


	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


	/**
	 * Cipher Feedback block mode.
	 */
	CryptoJS.mode.CFB = (function () {
	    var CFB = CryptoJS.lib.BlockCipherMode.extend();

	    CFB.Encryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // Remember this block to use with next block
	            this._prevBlock = words.slice(offset, offset + blockSize);
	        }
	    });

	    CFB.Decryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            // Remember this block to use with next block
	            var thisBlock = words.slice(offset, offset + blockSize);

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // This block becomes the previous block
	            this._prevBlock = thisBlock;
	        }
	    });

	    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
	        var keystream;

	        // Shortcut
	        var iv = this._iv;

	        // Generate keystream
	        if (iv) {
	            keystream = iv.slice(0);

	            // Remove IV for subsequent blocks
	            this._iv = undefined;
	        } else {
	            keystream = this._prevBlock;
	        }
	        cipher.encryptBlock(keystream, 0);

	        // Encrypt
	        for (var i = 0; i < blockSize; i++) {
	            words[offset + i] ^= keystream[i];
	        }
	    }

	    return CFB;
	}());


	/**
	 * Counter block mode.
	 */
	CryptoJS.mode.CTR = (function () {
	    var CTR = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = CTR.Encryptor = CTR.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Increment counter
	            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTR.Decryptor = Encryptor;

	    return CTR;
	}());


	/** @preserve
	 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
	 * derived from CryptoJS.mode.CTR
	 * Jan Hruby jhruby.web@gmail.com
	 */
	CryptoJS.mode.CTRGladman = (function () {
	    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word)
		{
			if (((word >> 24) & 0xff) === 0xff) { //overflow
			var b1 = (word >> 16)&0xff;
			var b2 = (word >> 8)&0xff;
			var b3 = word & 0xff;

			if (b1 === 0xff) // overflow b1
			{
			b1 = 0;
			if (b2 === 0xff)
			{
				b2 = 0;
				if (b3 === 0xff)
				{
					b3 = 0;
				}
				else
				{
					++b3;
				}
			}
			else
			{
				++b2;
			}
			}
			else
			{
			++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
			}
			else
			{
			word += (0x01 << 24);
			}
			return word;
		}

		function incCounter(counter)
		{
			if ((counter[0] = incWord(counter[0])) === 0)
			{
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

	    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }

				incCounter(counter);

				var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTRGladman.Decryptor = Encryptor;

	    return CTRGladman;
	}());




	/**
	 * Output Feedback block mode.
	 */
	CryptoJS.mode.OFB = (function () {
	    var OFB = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = OFB.Encryptor = OFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var keystream = this._keystream;

	            // Generate keystream
	            if (iv) {
	                keystream = this._keystream = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    OFB.Decryptor = Encryptor;

	    return OFB;
	}());


	/**
	 * Electronic Codebook block mode.
	 */
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();

	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });

	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });

	    return ECB;
	}());


	/**
	 * ANSI X.923 padding strategy.
	 */
	CryptoJS.pad.AnsiX923 = {
	    pad: function (data, blockSize) {
	        // Shortcuts
	        var dataSigBytes = data.sigBytes;
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

	        // Compute last byte position
	        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

	        // Pad
	        data.clamp();
	        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
	        data.sigBytes += nPaddingBytes;
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	/**
	 * ISO 10126 padding strategy.
	 */
	CryptoJS.pad.Iso10126 = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	        // Pad
	        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
	             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	/**
	 * ISO/IEC 9797-1 Padding Method 2.
	 */
	CryptoJS.pad.Iso97971 = {
	    pad: function (data, blockSize) {
	        // Add 0x80 byte
	        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

	        // Zero pad the rest
	        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
	    },

	    unpad: function (data) {
	        // Remove zero padding
	        CryptoJS.pad.ZeroPadding.unpad(data);

	        // Remove one more byte -- the 0x80 byte
	        data.sigBytes--;
	    }
	};


	/**
	 * Zero padding strategy.
	 */
	CryptoJS.pad.ZeroPadding = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Pad
	        data.clamp();
	        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
	    },

	    unpad: function (data) {
	        // Shortcut
	        var dataWords = data.words;

	        // Unpad
	        var i = data.sigBytes - 1;
	        for (var i = data.sigBytes - 1; i >= 0; i--) {
	            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
	                data.sigBytes = i + 1;
	                break;
	            }
	        }
	    }
	};


	/**
	 * A noop padding strategy.
	 */
	CryptoJS.pad.NoPadding = {
	    pad: function () {
	    },

	    unpad: function () {
	    }
	};


	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;

	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },

	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            var t;

	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Permuted Choice 1 constants
	    var PC1 = [
	        57, 49, 41, 33, 25, 17, 9,  1,
	        58, 50, 42, 34, 26, 18, 10, 2,
	        59, 51, 43, 35, 27, 19, 11, 3,
	        60, 52, 44, 36, 63, 55, 47, 39,
	        31, 23, 15, 7,  62, 54, 46, 38,
	        30, 22, 14, 6,  61, 53, 45, 37,
	        29, 21, 13, 5,  28, 20, 12, 4
	    ];

	    // Permuted Choice 2 constants
	    var PC2 = [
	        14, 17, 11, 24, 1,  5,
	        3,  28, 15, 6,  21, 10,
	        23, 19, 12, 4,  26, 8,
	        16, 7,  27, 20, 13, 2,
	        41, 52, 31, 37, 47, 55,
	        30, 40, 51, 45, 33, 48,
	        44, 49, 39, 56, 34, 53,
	        46, 42, 50, 36, 29, 32
	    ];

	    // Cumulative bit shift constants
	    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

	    // SBOXes and round permutation constants
	    var SBOX_P = [
	        {
	            0x0: 0x808200,
	            0x10000000: 0x8000,
	            0x20000000: 0x808002,
	            0x30000000: 0x2,
	            0x40000000: 0x200,
	            0x50000000: 0x808202,
	            0x60000000: 0x800202,
	            0x70000000: 0x800000,
	            0x80000000: 0x202,
	            0x90000000: 0x800200,
	            0xa0000000: 0x8200,
	            0xb0000000: 0x808000,
	            0xc0000000: 0x8002,
	            0xd0000000: 0x800002,
	            0xe0000000: 0x0,
	            0xf0000000: 0x8202,
	            0x8000000: 0x0,
	            0x18000000: 0x808202,
	            0x28000000: 0x8202,
	            0x38000000: 0x8000,
	            0x48000000: 0x808200,
	            0x58000000: 0x200,
	            0x68000000: 0x808002,
	            0x78000000: 0x2,
	            0x88000000: 0x800200,
	            0x98000000: 0x8200,
	            0xa8000000: 0x808000,
	            0xb8000000: 0x800202,
	            0xc8000000: 0x800002,
	            0xd8000000: 0x8002,
	            0xe8000000: 0x202,
	            0xf8000000: 0x800000,
	            0x1: 0x8000,
	            0x10000001: 0x2,
	            0x20000001: 0x808200,
	            0x30000001: 0x800000,
	            0x40000001: 0x808002,
	            0x50000001: 0x8200,
	            0x60000001: 0x200,
	            0x70000001: 0x800202,
	            0x80000001: 0x808202,
	            0x90000001: 0x808000,
	            0xa0000001: 0x800002,
	            0xb0000001: 0x8202,
	            0xc0000001: 0x202,
	            0xd0000001: 0x800200,
	            0xe0000001: 0x8002,
	            0xf0000001: 0x0,
	            0x8000001: 0x808202,
	            0x18000001: 0x808000,
	            0x28000001: 0x800000,
	            0x38000001: 0x200,
	            0x48000001: 0x8000,
	            0x58000001: 0x800002,
	            0x68000001: 0x2,
	            0x78000001: 0x8202,
	            0x88000001: 0x8002,
	            0x98000001: 0x800202,
	            0xa8000001: 0x202,
	            0xb8000001: 0x808200,
	            0xc8000001: 0x800200,
	            0xd8000001: 0x0,
	            0xe8000001: 0x8200,
	            0xf8000001: 0x808002
	        },
	        {
	            0x0: 0x40084010,
	            0x1000000: 0x4000,
	            0x2000000: 0x80000,
	            0x3000000: 0x40080010,
	            0x4000000: 0x40000010,
	            0x5000000: 0x40084000,
	            0x6000000: 0x40004000,
	            0x7000000: 0x10,
	            0x8000000: 0x84000,
	            0x9000000: 0x40004010,
	            0xa000000: 0x40000000,
	            0xb000000: 0x84010,
	            0xc000000: 0x80010,
	            0xd000000: 0x0,
	            0xe000000: 0x4010,
	            0xf000000: 0x40080000,
	            0x800000: 0x40004000,
	            0x1800000: 0x84010,
	            0x2800000: 0x10,
	            0x3800000: 0x40004010,
	            0x4800000: 0x40084010,
	            0x5800000: 0x40000000,
	            0x6800000: 0x80000,
	            0x7800000: 0x40080010,
	            0x8800000: 0x80010,
	            0x9800000: 0x0,
	            0xa800000: 0x4000,
	            0xb800000: 0x40080000,
	            0xc800000: 0x40000010,
	            0xd800000: 0x84000,
	            0xe800000: 0x40084000,
	            0xf800000: 0x4010,
	            0x10000000: 0x0,
	            0x11000000: 0x40080010,
	            0x12000000: 0x40004010,
	            0x13000000: 0x40084000,
	            0x14000000: 0x40080000,
	            0x15000000: 0x10,
	            0x16000000: 0x84010,
	            0x17000000: 0x4000,
	            0x18000000: 0x4010,
	            0x19000000: 0x80000,
	            0x1a000000: 0x80010,
	            0x1b000000: 0x40000010,
	            0x1c000000: 0x84000,
	            0x1d000000: 0x40004000,
	            0x1e000000: 0x40000000,
	            0x1f000000: 0x40084010,
	            0x10800000: 0x84010,
	            0x11800000: 0x80000,
	            0x12800000: 0x40080000,
	            0x13800000: 0x4000,
	            0x14800000: 0x40004000,
	            0x15800000: 0x40084010,
	            0x16800000: 0x10,
	            0x17800000: 0x40000000,
	            0x18800000: 0x40084000,
	            0x19800000: 0x40000010,
	            0x1a800000: 0x40004010,
	            0x1b800000: 0x80010,
	            0x1c800000: 0x0,
	            0x1d800000: 0x4010,
	            0x1e800000: 0x40080010,
	            0x1f800000: 0x84000
	        },
	        {
	            0x0: 0x104,
	            0x100000: 0x0,
	            0x200000: 0x4000100,
	            0x300000: 0x10104,
	            0x400000: 0x10004,
	            0x500000: 0x4000004,
	            0x600000: 0x4010104,
	            0x700000: 0x4010000,
	            0x800000: 0x4000000,
	            0x900000: 0x4010100,
	            0xa00000: 0x10100,
	            0xb00000: 0x4010004,
	            0xc00000: 0x4000104,
	            0xd00000: 0x10000,
	            0xe00000: 0x4,
	            0xf00000: 0x100,
	            0x80000: 0x4010100,
	            0x180000: 0x4010004,
	            0x280000: 0x0,
	            0x380000: 0x4000100,
	            0x480000: 0x4000004,
	            0x580000: 0x10000,
	            0x680000: 0x10004,
	            0x780000: 0x104,
	            0x880000: 0x4,
	            0x980000: 0x100,
	            0xa80000: 0x4010000,
	            0xb80000: 0x10104,
	            0xc80000: 0x10100,
	            0xd80000: 0x4000104,
	            0xe80000: 0x4010104,
	            0xf80000: 0x4000000,
	            0x1000000: 0x4010100,
	            0x1100000: 0x10004,
	            0x1200000: 0x10000,
	            0x1300000: 0x4000100,
	            0x1400000: 0x100,
	            0x1500000: 0x4010104,
	            0x1600000: 0x4000004,
	            0x1700000: 0x0,
	            0x1800000: 0x4000104,
	            0x1900000: 0x4000000,
	            0x1a00000: 0x4,
	            0x1b00000: 0x10100,
	            0x1c00000: 0x4010000,
	            0x1d00000: 0x104,
	            0x1e00000: 0x10104,
	            0x1f00000: 0x4010004,
	            0x1080000: 0x4000000,
	            0x1180000: 0x104,
	            0x1280000: 0x4010100,
	            0x1380000: 0x0,
	            0x1480000: 0x10004,
	            0x1580000: 0x4000100,
	            0x1680000: 0x100,
	            0x1780000: 0x4010004,
	            0x1880000: 0x10000,
	            0x1980000: 0x4010104,
	            0x1a80000: 0x10104,
	            0x1b80000: 0x4000004,
	            0x1c80000: 0x4000104,
	            0x1d80000: 0x4010000,
	            0x1e80000: 0x4,
	            0x1f80000: 0x10100
	        },
	        {
	            0x0: 0x80401000,
	            0x10000: 0x80001040,
	            0x20000: 0x401040,
	            0x30000: 0x80400000,
	            0x40000: 0x0,
	            0x50000: 0x401000,
	            0x60000: 0x80000040,
	            0x70000: 0x400040,
	            0x80000: 0x80000000,
	            0x90000: 0x400000,
	            0xa0000: 0x40,
	            0xb0000: 0x80001000,
	            0xc0000: 0x80400040,
	            0xd0000: 0x1040,
	            0xe0000: 0x1000,
	            0xf0000: 0x80401040,
	            0x8000: 0x80001040,
	            0x18000: 0x40,
	            0x28000: 0x80400040,
	            0x38000: 0x80001000,
	            0x48000: 0x401000,
	            0x58000: 0x80401040,
	            0x68000: 0x0,
	            0x78000: 0x80400000,
	            0x88000: 0x1000,
	            0x98000: 0x80401000,
	            0xa8000: 0x400000,
	            0xb8000: 0x1040,
	            0xc8000: 0x80000000,
	            0xd8000: 0x400040,
	            0xe8000: 0x401040,
	            0xf8000: 0x80000040,
	            0x100000: 0x400040,
	            0x110000: 0x401000,
	            0x120000: 0x80000040,
	            0x130000: 0x0,
	            0x140000: 0x1040,
	            0x150000: 0x80400040,
	            0x160000: 0x80401000,
	            0x170000: 0x80001040,
	            0x180000: 0x80401040,
	            0x190000: 0x80000000,
	            0x1a0000: 0x80400000,
	            0x1b0000: 0x401040,
	            0x1c0000: 0x80001000,
	            0x1d0000: 0x400000,
	            0x1e0000: 0x40,
	            0x1f0000: 0x1000,
	            0x108000: 0x80400000,
	            0x118000: 0x80401040,
	            0x128000: 0x0,
	            0x138000: 0x401000,
	            0x148000: 0x400040,
	            0x158000: 0x80000000,
	            0x168000: 0x80001040,
	            0x178000: 0x40,
	            0x188000: 0x80000040,
	            0x198000: 0x1000,
	            0x1a8000: 0x80001000,
	            0x1b8000: 0x80400040,
	            0x1c8000: 0x1040,
	            0x1d8000: 0x80401000,
	            0x1e8000: 0x400000,
	            0x1f8000: 0x401040
	        },
	        {
	            0x0: 0x80,
	            0x1000: 0x1040000,
	            0x2000: 0x40000,
	            0x3000: 0x20000000,
	            0x4000: 0x20040080,
	            0x5000: 0x1000080,
	            0x6000: 0x21000080,
	            0x7000: 0x40080,
	            0x8000: 0x1000000,
	            0x9000: 0x20040000,
	            0xa000: 0x20000080,
	            0xb000: 0x21040080,
	            0xc000: 0x21040000,
	            0xd000: 0x0,
	            0xe000: 0x1040080,
	            0xf000: 0x21000000,
	            0x800: 0x1040080,
	            0x1800: 0x21000080,
	            0x2800: 0x80,
	            0x3800: 0x1040000,
	            0x4800: 0x40000,
	            0x5800: 0x20040080,
	            0x6800: 0x21040000,
	            0x7800: 0x20000000,
	            0x8800: 0x20040000,
	            0x9800: 0x0,
	            0xa800: 0x21040080,
	            0xb800: 0x1000080,
	            0xc800: 0x20000080,
	            0xd800: 0x21000000,
	            0xe800: 0x1000000,
	            0xf800: 0x40080,
	            0x10000: 0x40000,
	            0x11000: 0x80,
	            0x12000: 0x20000000,
	            0x13000: 0x21000080,
	            0x14000: 0x1000080,
	            0x15000: 0x21040000,
	            0x16000: 0x20040080,
	            0x17000: 0x1000000,
	            0x18000: 0x21040080,
	            0x19000: 0x21000000,
	            0x1a000: 0x1040000,
	            0x1b000: 0x20040000,
	            0x1c000: 0x40080,
	            0x1d000: 0x20000080,
	            0x1e000: 0x0,
	            0x1f000: 0x1040080,
	            0x10800: 0x21000080,
	            0x11800: 0x1000000,
	            0x12800: 0x1040000,
	            0x13800: 0x20040080,
	            0x14800: 0x20000000,
	            0x15800: 0x1040080,
	            0x16800: 0x80,
	            0x17800: 0x21040000,
	            0x18800: 0x40080,
	            0x19800: 0x21040080,
	            0x1a800: 0x0,
	            0x1b800: 0x21000000,
	            0x1c800: 0x1000080,
	            0x1d800: 0x40000,
	            0x1e800: 0x20040000,
	            0x1f800: 0x20000080
	        },
	        {
	            0x0: 0x10000008,
	            0x100: 0x2000,
	            0x200: 0x10200000,
	            0x300: 0x10202008,
	            0x400: 0x10002000,
	            0x500: 0x200000,
	            0x600: 0x200008,
	            0x700: 0x10000000,
	            0x800: 0x0,
	            0x900: 0x10002008,
	            0xa00: 0x202000,
	            0xb00: 0x8,
	            0xc00: 0x10200008,
	            0xd00: 0x202008,
	            0xe00: 0x2008,
	            0xf00: 0x10202000,
	            0x80: 0x10200000,
	            0x180: 0x10202008,
	            0x280: 0x8,
	            0x380: 0x200000,
	            0x480: 0x202008,
	            0x580: 0x10000008,
	            0x680: 0x10002000,
	            0x780: 0x2008,
	            0x880: 0x200008,
	            0x980: 0x2000,
	            0xa80: 0x10002008,
	            0xb80: 0x10200008,
	            0xc80: 0x0,
	            0xd80: 0x10202000,
	            0xe80: 0x202000,
	            0xf80: 0x10000000,
	            0x1000: 0x10002000,
	            0x1100: 0x10200008,
	            0x1200: 0x10202008,
	            0x1300: 0x2008,
	            0x1400: 0x200000,
	            0x1500: 0x10000000,
	            0x1600: 0x10000008,
	            0x1700: 0x202000,
	            0x1800: 0x202008,
	            0x1900: 0x0,
	            0x1a00: 0x8,
	            0x1b00: 0x10200000,
	            0x1c00: 0x2000,
	            0x1d00: 0x10002008,
	            0x1e00: 0x10202000,
	            0x1f00: 0x200008,
	            0x1080: 0x8,
	            0x1180: 0x202000,
	            0x1280: 0x200000,
	            0x1380: 0x10000008,
	            0x1480: 0x10002000,
	            0x1580: 0x2008,
	            0x1680: 0x10202008,
	            0x1780: 0x10200000,
	            0x1880: 0x10202000,
	            0x1980: 0x10200008,
	            0x1a80: 0x2000,
	            0x1b80: 0x202008,
	            0x1c80: 0x200008,
	            0x1d80: 0x0,
	            0x1e80: 0x10000000,
	            0x1f80: 0x10002008
	        },
	        {
	            0x0: 0x100000,
	            0x10: 0x2000401,
	            0x20: 0x400,
	            0x30: 0x100401,
	            0x40: 0x2100401,
	            0x50: 0x0,
	            0x60: 0x1,
	            0x70: 0x2100001,
	            0x80: 0x2000400,
	            0x90: 0x100001,
	            0xa0: 0x2000001,
	            0xb0: 0x2100400,
	            0xc0: 0x2100000,
	            0xd0: 0x401,
	            0xe0: 0x100400,
	            0xf0: 0x2000000,
	            0x8: 0x2100001,
	            0x18: 0x0,
	            0x28: 0x2000401,
	            0x38: 0x2100400,
	            0x48: 0x100000,
	            0x58: 0x2000001,
	            0x68: 0x2000000,
	            0x78: 0x401,
	            0x88: 0x100401,
	            0x98: 0x2000400,
	            0xa8: 0x2100000,
	            0xb8: 0x100001,
	            0xc8: 0x400,
	            0xd8: 0x2100401,
	            0xe8: 0x1,
	            0xf8: 0x100400,
	            0x100: 0x2000000,
	            0x110: 0x100000,
	            0x120: 0x2000401,
	            0x130: 0x2100001,
	            0x140: 0x100001,
	            0x150: 0x2000400,
	            0x160: 0x2100400,
	            0x170: 0x100401,
	            0x180: 0x401,
	            0x190: 0x2100401,
	            0x1a0: 0x100400,
	            0x1b0: 0x1,
	            0x1c0: 0x0,
	            0x1d0: 0x2100000,
	            0x1e0: 0x2000001,
	            0x1f0: 0x400,
	            0x108: 0x100400,
	            0x118: 0x2000401,
	            0x128: 0x2100001,
	            0x138: 0x1,
	            0x148: 0x2000000,
	            0x158: 0x100000,
	            0x168: 0x401,
	            0x178: 0x2100400,
	            0x188: 0x2000001,
	            0x198: 0x2100000,
	            0x1a8: 0x0,
	            0x1b8: 0x2100401,
	            0x1c8: 0x100401,
	            0x1d8: 0x400,
	            0x1e8: 0x2000400,
	            0x1f8: 0x100001
	        },
	        {
	            0x0: 0x8000820,
	            0x1: 0x20000,
	            0x2: 0x8000000,
	            0x3: 0x20,
	            0x4: 0x20020,
	            0x5: 0x8020820,
	            0x6: 0x8020800,
	            0x7: 0x800,
	            0x8: 0x8020000,
	            0x9: 0x8000800,
	            0xa: 0x20800,
	            0xb: 0x8020020,
	            0xc: 0x820,
	            0xd: 0x0,
	            0xe: 0x8000020,
	            0xf: 0x20820,
	            0x80000000: 0x800,
	            0x80000001: 0x8020820,
	            0x80000002: 0x8000820,
	            0x80000003: 0x8000000,
	            0x80000004: 0x8020000,
	            0x80000005: 0x20800,
	            0x80000006: 0x20820,
	            0x80000007: 0x20,
	            0x80000008: 0x8000020,
	            0x80000009: 0x820,
	            0x8000000a: 0x20020,
	            0x8000000b: 0x8020800,
	            0x8000000c: 0x0,
	            0x8000000d: 0x8020020,
	            0x8000000e: 0x8000800,
	            0x8000000f: 0x20000,
	            0x10: 0x20820,
	            0x11: 0x8020800,
	            0x12: 0x20,
	            0x13: 0x800,
	            0x14: 0x8000800,
	            0x15: 0x8000020,
	            0x16: 0x8020020,
	            0x17: 0x20000,
	            0x18: 0x0,
	            0x19: 0x20020,
	            0x1a: 0x8020000,
	            0x1b: 0x8000820,
	            0x1c: 0x8020820,
	            0x1d: 0x20800,
	            0x1e: 0x820,
	            0x1f: 0x8000000,
	            0x80000010: 0x20000,
	            0x80000011: 0x800,
	            0x80000012: 0x8020020,
	            0x80000013: 0x20820,
	            0x80000014: 0x20,
	            0x80000015: 0x8020000,
	            0x80000016: 0x8000000,
	            0x80000017: 0x8000820,
	            0x80000018: 0x8020820,
	            0x80000019: 0x8000020,
	            0x8000001a: 0x8000800,
	            0x8000001b: 0x0,
	            0x8000001c: 0x20800,
	            0x8000001d: 0x820,
	            0x8000001e: 0x20020,
	            0x8000001f: 0x8020800
	        }
	    ];

	    // Masks that select the SBOX input
	    var SBOX_MASK = [
	        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
	        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
	    ];

	    /**
	     * DES block cipher algorithm.
	     */
	    var DES = C_algo.DES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Select 56 bits according to PC1
	            var keyBits = [];
	            for (var i = 0; i < 56; i++) {
	                var keyBitPos = PC1[i] - 1;
	                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
	            }

	            // Assemble 16 subkeys
	            var subKeys = this._subKeys = [];
	            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
	                // Create subkey
	                var subKey = subKeys[nSubKey] = [];

	                // Shortcut
	                var bitShift = BIT_SHIFTS[nSubKey];

	                // Select 48 bits according to PC2
	                for (var i = 0; i < 24; i++) {
	                    // Select from the left 28 key bits
	                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

	                    // Select from the right 28 key bits
	                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
	                }

	                // Since each subkey is applied to an expanded 32-bit input,
	                // the subkey can be broken into 8 values scaled to 32-bits,
	                // which allows the key to be used without expansion
	                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
	                for (var i = 1; i < 7; i++) {
	                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
	                }
	                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
	            }

	            // Compute inverse subkeys
	            var invSubKeys = this._invSubKeys = [];
	            for (var i = 0; i < 16; i++) {
	                invSubKeys[i] = subKeys[15 - i];
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._subKeys);
	        },

	        decryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._invSubKeys);
	        },

	        _doCryptBlock: function (M, offset, subKeys) {
	            // Get input
	            this._lBlock = M[offset];
	            this._rBlock = M[offset + 1];

	            // Initial permutation
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeLR.call(this, 1,  0x55555555);

	            // Rounds
	            for (var round = 0; round < 16; round++) {
	                // Shortcuts
	                var subKey = subKeys[round];
	                var lBlock = this._lBlock;
	                var rBlock = this._rBlock;

	                // Feistel function
	                var f = 0;
	                for (var i = 0; i < 8; i++) {
	                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
	                }
	                this._lBlock = rBlock;
	                this._rBlock = lBlock ^ f;
	            }

	            // Undo swap from last round
	            var t = this._lBlock;
	            this._lBlock = this._rBlock;
	            this._rBlock = t;

	            // Final permutation
	            exchangeLR.call(this, 1,  0x55555555);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeLR.call(this, 4,  0x0f0f0f0f);

	            // Set output
	            M[offset] = this._lBlock;
	            M[offset + 1] = this._rBlock;
	        },

	        keySize: 64/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    // Swap bits across the left and right words
	    function exchangeLR(offset, mask) {
	        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
	        this._rBlock ^= t;
	        this._lBlock ^= t << offset;
	    }

	    function exchangeRL(offset, mask) {
	        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
	        this._lBlock ^= t;
	        this._rBlock ^= t << offset;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
	     */
	    C.DES = BlockCipher._createHelper(DES);

	    /**
	     * Triple-DES block cipher algorithm.
	     */
	    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            // Make sure the key length is valid (64, 128 or >= 192 bit)
	            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
	                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
	            }

	            // Extend the key according to the keying options defined in 3DES standard
	            var key1 = keyWords.slice(0, 2);
	            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
	            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

	            // Create DES instances
	            this._des1 = DES.createEncryptor(WordArray.create(key1));
	            this._des2 = DES.createEncryptor(WordArray.create(key2));
	            this._des3 = DES.createEncryptor(WordArray.create(key3));
	        },

	        encryptBlock: function (M, offset) {
	            this._des1.encryptBlock(M, offset);
	            this._des2.decryptBlock(M, offset);
	            this._des3.encryptBlock(M, offset);
	        },

	        decryptBlock: function (M, offset) {
	            this._des3.decryptBlock(M, offset);
	            this._des2.encryptBlock(M, offset);
	            this._des1.decryptBlock(M, offset);
	        },

	        keySize: 192/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
	     */
	    C.TripleDES = BlockCipher._createHelper(TripleDES);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    /**
	     * RC4 stream cipher algorithm.
	     */
	    var RC4 = C_algo.RC4 = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            var keySigBytes = key.sigBytes;

	            // Init sbox
	            var S = this._S = [];
	            for (var i = 0; i < 256; i++) {
	                S[i] = i;
	            }

	            // Key setup
	            for (var i = 0, j = 0; i < 256; i++) {
	                var keyByteIndex = i % keySigBytes;
	                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

	                j = (j + S[i] + keyByte) % 256;

	                // Swap
	                var t = S[i];
	                S[i] = S[j];
	                S[j] = t;
	            }

	            // Counters
	            this._i = this._j = 0;
	        },

	        _doProcessBlock: function (M, offset) {
	            M[offset] ^= generateKeystreamWord.call(this);
	        },

	        keySize: 256/32,

	        ivSize: 0
	    });

	    function generateKeystreamWord() {
	        // Shortcuts
	        var S = this._S;
	        var i = this._i;
	        var j = this._j;

	        // Generate keystream word
	        var keystreamWord = 0;
	        for (var n = 0; n < 4; n++) {
	            i = (i + 1) % 256;
	            j = (j + S[i]) % 256;

	            // Swap
	            var t = S[i];
	            S[i] = S[j];
	            S[j] = t;

	            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
	        }

	        // Update counters
	        this._i = i;
	        this._j = j;

	        return keystreamWord;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4 = StreamCipher._createHelper(RC4);

	    /**
	     * Modified RC4 stream cipher algorithm.
	     */
	    var RC4Drop = C_algo.RC4Drop = RC4.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} drop The number of keystream words to drop. Default 192
	         */
	        cfg: RC4.cfg.extend({
	            drop: 192
	        }),

	        _doReset: function () {
	            RC4._doReset.call(this);

	            // Drop
	            for (var i = this.cfg.drop; i > 0; i--) {
	                generateKeystreamWord.call(this);
	            }
	        }
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm
	     */
	    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
	                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
	            }

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
	     */
	    C.Rabbit = StreamCipher._createHelper(Rabbit);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm.
	     *
	     * This is a legacy version that neglected to convert the key to little-endian.
	     * This error doesn't affect the cipher's security,
	     * but it does affect its compatibility with other implementations.
	     */
	    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
	     */
	    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	}());


	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    const N = 16;

	    //Origin pbox and sbox, derived from PI
	    const ORIG_P = [
	        0x243F6A88, 0x85A308D3, 0x13198A2E, 0x03707344,
	        0xA4093822, 0x299F31D0, 0x082EFA98, 0xEC4E6C89,
	        0x452821E6, 0x38D01377, 0xBE5466CF, 0x34E90C6C,
	        0xC0AC29B7, 0xC97C50DD, 0x3F84D5B5, 0xB5470917,
	        0x9216D5D9, 0x8979FB1B
	    ];

	    const ORIG_S = [
	        [   0xD1310BA6, 0x98DFB5AC, 0x2FFD72DB, 0xD01ADFB7,
	            0xB8E1AFED, 0x6A267E96, 0xBA7C9045, 0xF12C7F99,
	            0x24A19947, 0xB3916CF7, 0x0801F2E2, 0x858EFC16,
	            0x636920D8, 0x71574E69, 0xA458FEA3, 0xF4933D7E,
	            0x0D95748F, 0x728EB658, 0x718BCD58, 0x82154AEE,
	            0x7B54A41D, 0xC25A59B5, 0x9C30D539, 0x2AF26013,
	            0xC5D1B023, 0x286085F0, 0xCA417918, 0xB8DB38EF,
	            0x8E79DCB0, 0x603A180E, 0x6C9E0E8B, 0xB01E8A3E,
	            0xD71577C1, 0xBD314B27, 0x78AF2FDA, 0x55605C60,
	            0xE65525F3, 0xAA55AB94, 0x57489862, 0x63E81440,
	            0x55CA396A, 0x2AAB10B6, 0xB4CC5C34, 0x1141E8CE,
	            0xA15486AF, 0x7C72E993, 0xB3EE1411, 0x636FBC2A,
	            0x2BA9C55D, 0x741831F6, 0xCE5C3E16, 0x9B87931E,
	            0xAFD6BA33, 0x6C24CF5C, 0x7A325381, 0x28958677,
	            0x3B8F4898, 0x6B4BB9AF, 0xC4BFE81B, 0x66282193,
	            0x61D809CC, 0xFB21A991, 0x487CAC60, 0x5DEC8032,
	            0xEF845D5D, 0xE98575B1, 0xDC262302, 0xEB651B88,
	            0x23893E81, 0xD396ACC5, 0x0F6D6FF3, 0x83F44239,
	            0x2E0B4482, 0xA4842004, 0x69C8F04A, 0x9E1F9B5E,
	            0x21C66842, 0xF6E96C9A, 0x670C9C61, 0xABD388F0,
	            0x6A51A0D2, 0xD8542F68, 0x960FA728, 0xAB5133A3,
	            0x6EEF0B6C, 0x137A3BE4, 0xBA3BF050, 0x7EFB2A98,
	            0xA1F1651D, 0x39AF0176, 0x66CA593E, 0x82430E88,
	            0x8CEE8619, 0x456F9FB4, 0x7D84A5C3, 0x3B8B5EBE,
	            0xE06F75D8, 0x85C12073, 0x401A449F, 0x56C16AA6,
	            0x4ED3AA62, 0x363F7706, 0x1BFEDF72, 0x429B023D,
	            0x37D0D724, 0xD00A1248, 0xDB0FEAD3, 0x49F1C09B,
	            0x075372C9, 0x80991B7B, 0x25D479D8, 0xF6E8DEF7,
	            0xE3FE501A, 0xB6794C3B, 0x976CE0BD, 0x04C006BA,
	            0xC1A94FB6, 0x409F60C4, 0x5E5C9EC2, 0x196A2463,
	            0x68FB6FAF, 0x3E6C53B5, 0x1339B2EB, 0x3B52EC6F,
	            0x6DFC511F, 0x9B30952C, 0xCC814544, 0xAF5EBD09,
	            0xBEE3D004, 0xDE334AFD, 0x660F2807, 0x192E4BB3,
	            0xC0CBA857, 0x45C8740F, 0xD20B5F39, 0xB9D3FBDB,
	            0x5579C0BD, 0x1A60320A, 0xD6A100C6, 0x402C7279,
	            0x679F25FE, 0xFB1FA3CC, 0x8EA5E9F8, 0xDB3222F8,
	            0x3C7516DF, 0xFD616B15, 0x2F501EC8, 0xAD0552AB,
	            0x323DB5FA, 0xFD238760, 0x53317B48, 0x3E00DF82,
	            0x9E5C57BB, 0xCA6F8CA0, 0x1A87562E, 0xDF1769DB,
	            0xD542A8F6, 0x287EFFC3, 0xAC6732C6, 0x8C4F5573,
	            0x695B27B0, 0xBBCA58C8, 0xE1FFA35D, 0xB8F011A0,
	            0x10FA3D98, 0xFD2183B8, 0x4AFCB56C, 0x2DD1D35B,
	            0x9A53E479, 0xB6F84565, 0xD28E49BC, 0x4BFB9790,
	            0xE1DDF2DA, 0xA4CB7E33, 0x62FB1341, 0xCEE4C6E8,
	            0xEF20CADA, 0x36774C01, 0xD07E9EFE, 0x2BF11FB4,
	            0x95DBDA4D, 0xAE909198, 0xEAAD8E71, 0x6B93D5A0,
	            0xD08ED1D0, 0xAFC725E0, 0x8E3C5B2F, 0x8E7594B7,
	            0x8FF6E2FB, 0xF2122B64, 0x8888B812, 0x900DF01C,
	            0x4FAD5EA0, 0x688FC31C, 0xD1CFF191, 0xB3A8C1AD,
	            0x2F2F2218, 0xBE0E1777, 0xEA752DFE, 0x8B021FA1,
	            0xE5A0CC0F, 0xB56F74E8, 0x18ACF3D6, 0xCE89E299,
	            0xB4A84FE0, 0xFD13E0B7, 0x7CC43B81, 0xD2ADA8D9,
	            0x165FA266, 0x80957705, 0x93CC7314, 0x211A1477,
	            0xE6AD2065, 0x77B5FA86, 0xC75442F5, 0xFB9D35CF,
	            0xEBCDAF0C, 0x7B3E89A0, 0xD6411BD3, 0xAE1E7E49,
	            0x00250E2D, 0x2071B35E, 0x226800BB, 0x57B8E0AF,
	            0x2464369B, 0xF009B91E, 0x5563911D, 0x59DFA6AA,
	            0x78C14389, 0xD95A537F, 0x207D5BA2, 0x02E5B9C5,
	            0x83260376, 0x6295CFA9, 0x11C81968, 0x4E734A41,
	            0xB3472DCA, 0x7B14A94A, 0x1B510052, 0x9A532915,
	            0xD60F573F, 0xBC9BC6E4, 0x2B60A476, 0x81E67400,
	            0x08BA6FB5, 0x571BE91F, 0xF296EC6B, 0x2A0DD915,
	            0xB6636521, 0xE7B9F9B6, 0xFF34052E, 0xC5855664,
	            0x53B02D5D, 0xA99F8FA1, 0x08BA4799, 0x6E85076A   ],
	        [   0x4B7A70E9, 0xB5B32944, 0xDB75092E, 0xC4192623,
	            0xAD6EA6B0, 0x49A7DF7D, 0x9CEE60B8, 0x8FEDB266,
	            0xECAA8C71, 0x699A17FF, 0x5664526C, 0xC2B19EE1,
	            0x193602A5, 0x75094C29, 0xA0591340, 0xE4183A3E,
	            0x3F54989A, 0x5B429D65, 0x6B8FE4D6, 0x99F73FD6,
	            0xA1D29C07, 0xEFE830F5, 0x4D2D38E6, 0xF0255DC1,
	            0x4CDD2086, 0x8470EB26, 0x6382E9C6, 0x021ECC5E,
	            0x09686B3F, 0x3EBAEFC9, 0x3C971814, 0x6B6A70A1,
	            0x687F3584, 0x52A0E286, 0xB79C5305, 0xAA500737,
	            0x3E07841C, 0x7FDEAE5C, 0x8E7D44EC, 0x5716F2B8,
	            0xB03ADA37, 0xF0500C0D, 0xF01C1F04, 0x0200B3FF,
	            0xAE0CF51A, 0x3CB574B2, 0x25837A58, 0xDC0921BD,
	            0xD19113F9, 0x7CA92FF6, 0x94324773, 0x22F54701,
	            0x3AE5E581, 0x37C2DADC, 0xC8B57634, 0x9AF3DDA7,
	            0xA9446146, 0x0FD0030E, 0xECC8C73E, 0xA4751E41,
	            0xE238CD99, 0x3BEA0E2F, 0x3280BBA1, 0x183EB331,
	            0x4E548B38, 0x4F6DB908, 0x6F420D03, 0xF60A04BF,
	            0x2CB81290, 0x24977C79, 0x5679B072, 0xBCAF89AF,
	            0xDE9A771F, 0xD9930810, 0xB38BAE12, 0xDCCF3F2E,
	            0x5512721F, 0x2E6B7124, 0x501ADDE6, 0x9F84CD87,
	            0x7A584718, 0x7408DA17, 0xBC9F9ABC, 0xE94B7D8C,
	            0xEC7AEC3A, 0xDB851DFA, 0x63094366, 0xC464C3D2,
	            0xEF1C1847, 0x3215D908, 0xDD433B37, 0x24C2BA16,
	            0x12A14D43, 0x2A65C451, 0x50940002, 0x133AE4DD,
	            0x71DFF89E, 0x10314E55, 0x81AC77D6, 0x5F11199B,
	            0x043556F1, 0xD7A3C76B, 0x3C11183B, 0x5924A509,
	            0xF28FE6ED, 0x97F1FBFA, 0x9EBABF2C, 0x1E153C6E,
	            0x86E34570, 0xEAE96FB1, 0x860E5E0A, 0x5A3E2AB3,
	            0x771FE71C, 0x4E3D06FA, 0x2965DCB9, 0x99E71D0F,
	            0x803E89D6, 0x5266C825, 0x2E4CC978, 0x9C10B36A,
	            0xC6150EBA, 0x94E2EA78, 0xA5FC3C53, 0x1E0A2DF4,
	            0xF2F74EA7, 0x361D2B3D, 0x1939260F, 0x19C27960,
	            0x5223A708, 0xF71312B6, 0xEBADFE6E, 0xEAC31F66,
	            0xE3BC4595, 0xA67BC883, 0xB17F37D1, 0x018CFF28,
	            0xC332DDEF, 0xBE6C5AA5, 0x65582185, 0x68AB9802,
	            0xEECEA50F, 0xDB2F953B, 0x2AEF7DAD, 0x5B6E2F84,
	            0x1521B628, 0x29076170, 0xECDD4775, 0x619F1510,
	            0x13CCA830, 0xEB61BD96, 0x0334FE1E, 0xAA0363CF,
	            0xB5735C90, 0x4C70A239, 0xD59E9E0B, 0xCBAADE14,
	            0xEECC86BC, 0x60622CA7, 0x9CAB5CAB, 0xB2F3846E,
	            0x648B1EAF, 0x19BDF0CA, 0xA02369B9, 0x655ABB50,
	            0x40685A32, 0x3C2AB4B3, 0x319EE9D5, 0xC021B8F7,
	            0x9B540B19, 0x875FA099, 0x95F7997E, 0x623D7DA8,
	            0xF837889A, 0x97E32D77, 0x11ED935F, 0x16681281,
	            0x0E358829, 0xC7E61FD6, 0x96DEDFA1, 0x7858BA99,
	            0x57F584A5, 0x1B227263, 0x9B83C3FF, 0x1AC24696,
	            0xCDB30AEB, 0x532E3054, 0x8FD948E4, 0x6DBC3128,
	            0x58EBF2EF, 0x34C6FFEA, 0xFE28ED61, 0xEE7C3C73,
	            0x5D4A14D9, 0xE864B7E3, 0x42105D14, 0x203E13E0,
	            0x45EEE2B6, 0xA3AAABEA, 0xDB6C4F15, 0xFACB4FD0,
	            0xC742F442, 0xEF6ABBB5, 0x654F3B1D, 0x41CD2105,
	            0xD81E799E, 0x86854DC7, 0xE44B476A, 0x3D816250,
	            0xCF62A1F2, 0x5B8D2646, 0xFC8883A0, 0xC1C7B6A3,
	            0x7F1524C3, 0x69CB7492, 0x47848A0B, 0x5692B285,
	            0x095BBF00, 0xAD19489D, 0x1462B174, 0x23820E00,
	            0x58428D2A, 0x0C55F5EA, 0x1DADF43E, 0x233F7061,
	            0x3372F092, 0x8D937E41, 0xD65FECF1, 0x6C223BDB,
	            0x7CDE3759, 0xCBEE7460, 0x4085F2A7, 0xCE77326E,
	            0xA6078084, 0x19F8509E, 0xE8EFD855, 0x61D99735,
	            0xA969A7AA, 0xC50C06C2, 0x5A04ABFC, 0x800BCADC,
	            0x9E447A2E, 0xC3453484, 0xFDD56705, 0x0E1E9EC9,
	            0xDB73DBD3, 0x105588CD, 0x675FDA79, 0xE3674340,
	            0xC5C43465, 0x713E38D8, 0x3D28F89E, 0xF16DFF20,
	            0x153E21E7, 0x8FB03D4A, 0xE6E39F2B, 0xDB83ADF7   ],
	        [   0xE93D5A68, 0x948140F7, 0xF64C261C, 0x94692934,
	            0x411520F7, 0x7602D4F7, 0xBCF46B2E, 0xD4A20068,
	            0xD4082471, 0x3320F46A, 0x43B7D4B7, 0x500061AF,
	            0x1E39F62E, 0x97244546, 0x14214F74, 0xBF8B8840,
	            0x4D95FC1D, 0x96B591AF, 0x70F4DDD3, 0x66A02F45,
	            0xBFBC09EC, 0x03BD9785, 0x7FAC6DD0, 0x31CB8504,
	            0x96EB27B3, 0x55FD3941, 0xDA2547E6, 0xABCA0A9A,
	            0x28507825, 0x530429F4, 0x0A2C86DA, 0xE9B66DFB,
	            0x68DC1462, 0xD7486900, 0x680EC0A4, 0x27A18DEE,
	            0x4F3FFEA2, 0xE887AD8C, 0xB58CE006, 0x7AF4D6B6,
	            0xAACE1E7C, 0xD3375FEC, 0xCE78A399, 0x406B2A42,
	            0x20FE9E35, 0xD9F385B9, 0xEE39D7AB, 0x3B124E8B,
	            0x1DC9FAF7, 0x4B6D1856, 0x26A36631, 0xEAE397B2,
	            0x3A6EFA74, 0xDD5B4332, 0x6841E7F7, 0xCA7820FB,
	            0xFB0AF54E, 0xD8FEB397, 0x454056AC, 0xBA489527,
	            0x55533A3A, 0x20838D87, 0xFE6BA9B7, 0xD096954B,
	            0x55A867BC, 0xA1159A58, 0xCCA92963, 0x99E1DB33,
	            0xA62A4A56, 0x3F3125F9, 0x5EF47E1C, 0x9029317C,
	            0xFDF8E802, 0x04272F70, 0x80BB155C, 0x05282CE3,
	            0x95C11548, 0xE4C66D22, 0x48C1133F, 0xC70F86DC,
	            0x07F9C9EE, 0x41041F0F, 0x404779A4, 0x5D886E17,
	            0x325F51EB, 0xD59BC0D1, 0xF2BCC18F, 0x41113564,
	            0x257B7834, 0x602A9C60, 0xDFF8E8A3, 0x1F636C1B,
	            0x0E12B4C2, 0x02E1329E, 0xAF664FD1, 0xCAD18115,
	            0x6B2395E0, 0x333E92E1, 0x3B240B62, 0xEEBEB922,
	            0x85B2A20E, 0xE6BA0D99, 0xDE720C8C, 0x2DA2F728,
	            0xD0127845, 0x95B794FD, 0x647D0862, 0xE7CCF5F0,
	            0x5449A36F, 0x877D48FA, 0xC39DFD27, 0xF33E8D1E,
	            0x0A476341, 0x992EFF74, 0x3A6F6EAB, 0xF4F8FD37,
	            0xA812DC60, 0xA1EBDDF8, 0x991BE14C, 0xDB6E6B0D,
	            0xC67B5510, 0x6D672C37, 0x2765D43B, 0xDCD0E804,
	            0xF1290DC7, 0xCC00FFA3, 0xB5390F92, 0x690FED0B,
	            0x667B9FFB, 0xCEDB7D9C, 0xA091CF0B, 0xD9155EA3,
	            0xBB132F88, 0x515BAD24, 0x7B9479BF, 0x763BD6EB,
	            0x37392EB3, 0xCC115979, 0x8026E297, 0xF42E312D,
	            0x6842ADA7, 0xC66A2B3B, 0x12754CCC, 0x782EF11C,
	            0x6A124237, 0xB79251E7, 0x06A1BBE6, 0x4BFB6350,
	            0x1A6B1018, 0x11CAEDFA, 0x3D25BDD8, 0xE2E1C3C9,
	            0x44421659, 0x0A121386, 0xD90CEC6E, 0xD5ABEA2A,
	            0x64AF674E, 0xDA86A85F, 0xBEBFE988, 0x64E4C3FE,
	            0x9DBC8057, 0xF0F7C086, 0x60787BF8, 0x6003604D,
	            0xD1FD8346, 0xF6381FB0, 0x7745AE04, 0xD736FCCC,
	            0x83426B33, 0xF01EAB71, 0xB0804187, 0x3C005E5F,
	            0x77A057BE, 0xBDE8AE24, 0x55464299, 0xBF582E61,
	            0x4E58F48F, 0xF2DDFDA2, 0xF474EF38, 0x8789BDC2,
	            0x5366F9C3, 0xC8B38E74, 0xB475F255, 0x46FCD9B9,
	            0x7AEB2661, 0x8B1DDF84, 0x846A0E79, 0x915F95E2,
	            0x466E598E, 0x20B45770, 0x8CD55591, 0xC902DE4C,
	            0xB90BACE1, 0xBB8205D0, 0x11A86248, 0x7574A99E,
	            0xB77F19B6, 0xE0A9DC09, 0x662D09A1, 0xC4324633,
	            0xE85A1F02, 0x09F0BE8C, 0x4A99A025, 0x1D6EFE10,
	            0x1AB93D1D, 0x0BA5A4DF, 0xA186F20F, 0x2868F169,
	            0xDCB7DA83, 0x573906FE, 0xA1E2CE9B, 0x4FCD7F52,
	            0x50115E01, 0xA70683FA, 0xA002B5C4, 0x0DE6D027,
	            0x9AF88C27, 0x773F8641, 0xC3604C06, 0x61A806B5,
	            0xF0177A28, 0xC0F586E0, 0x006058AA, 0x30DC7D62,
	            0x11E69ED7, 0x2338EA63, 0x53C2DD94, 0xC2C21634,
	            0xBBCBEE56, 0x90BCB6DE, 0xEBFC7DA1, 0xCE591D76,
	            0x6F05E409, 0x4B7C0188, 0x39720A3D, 0x7C927C24,
	            0x86E3725F, 0x724D9DB9, 0x1AC15BB4, 0xD39EB8FC,
	            0xED545578, 0x08FCA5B5, 0xD83D7CD3, 0x4DAD0FC4,
	            0x1E50EF5E, 0xB161E6F8, 0xA28514D9, 0x6C51133C,
	            0x6FD5C7E7, 0x56E14EC4, 0x362ABFCE, 0xDDC6C837,
	            0xD79A3234, 0x92638212, 0x670EFA8E, 0x406000E0  ],
	        [   0x3A39CE37, 0xD3FAF5CF, 0xABC27737, 0x5AC52D1B,
	            0x5CB0679E, 0x4FA33742, 0xD3822740, 0x99BC9BBE,
	            0xD5118E9D, 0xBF0F7315, 0xD62D1C7E, 0xC700C47B,
	            0xB78C1B6B, 0x21A19045, 0xB26EB1BE, 0x6A366EB4,
	            0x5748AB2F, 0xBC946E79, 0xC6A376D2, 0x6549C2C8,
	            0x530FF8EE, 0x468DDE7D, 0xD5730A1D, 0x4CD04DC6,
	            0x2939BBDB, 0xA9BA4650, 0xAC9526E8, 0xBE5EE304,
	            0xA1FAD5F0, 0x6A2D519A, 0x63EF8CE2, 0x9A86EE22,
	            0xC089C2B8, 0x43242EF6, 0xA51E03AA, 0x9CF2D0A4,
	            0x83C061BA, 0x9BE96A4D, 0x8FE51550, 0xBA645BD6,
	            0x2826A2F9, 0xA73A3AE1, 0x4BA99586, 0xEF5562E9,
	            0xC72FEFD3, 0xF752F7DA, 0x3F046F69, 0x77FA0A59,
	            0x80E4A915, 0x87B08601, 0x9B09E6AD, 0x3B3EE593,
	            0xE990FD5A, 0x9E34D797, 0x2CF0B7D9, 0x022B8B51,
	            0x96D5AC3A, 0x017DA67D, 0xD1CF3ED6, 0x7C7D2D28,
	            0x1F9F25CF, 0xADF2B89B, 0x5AD6B472, 0x5A88F54C,
	            0xE029AC71, 0xE019A5E6, 0x47B0ACFD, 0xED93FA9B,
	            0xE8D3C48D, 0x283B57CC, 0xF8D56629, 0x79132E28,
	            0x785F0191, 0xED756055, 0xF7960E44, 0xE3D35E8C,
	            0x15056DD4, 0x88F46DBA, 0x03A16125, 0x0564F0BD,
	            0xC3EB9E15, 0x3C9057A2, 0x97271AEC, 0xA93A072A,
	            0x1B3F6D9B, 0x1E6321F5, 0xF59C66FB, 0x26DCF319,
	            0x7533D928, 0xB155FDF5, 0x03563482, 0x8ABA3CBB,
	            0x28517711, 0xC20AD9F8, 0xABCC5167, 0xCCAD925F,
	            0x4DE81751, 0x3830DC8E, 0x379D5862, 0x9320F991,
	            0xEA7A90C2, 0xFB3E7BCE, 0x5121CE64, 0x774FBE32,
	            0xA8B6E37E, 0xC3293D46, 0x48DE5369, 0x6413E680,
	            0xA2AE0810, 0xDD6DB224, 0x69852DFD, 0x09072166,
	            0xB39A460A, 0x6445C0DD, 0x586CDECF, 0x1C20C8AE,
	            0x5BBEF7DD, 0x1B588D40, 0xCCD2017F, 0x6BB4E3BB,
	            0xDDA26A7E, 0x3A59FF45, 0x3E350A44, 0xBCB4CDD5,
	            0x72EACEA8, 0xFA6484BB, 0x8D6612AE, 0xBF3C6F47,
	            0xD29BE463, 0x542F5D9E, 0xAEC2771B, 0xF64E6370,
	            0x740E0D8D, 0xE75B1357, 0xF8721671, 0xAF537D5D,
	            0x4040CB08, 0x4EB4E2CC, 0x34D2466A, 0x0115AF84,
	            0xE1B00428, 0x95983A1D, 0x06B89FB4, 0xCE6EA048,
	            0x6F3F3B82, 0x3520AB82, 0x011A1D4B, 0x277227F8,
	            0x611560B1, 0xE7933FDC, 0xBB3A792B, 0x344525BD,
	            0xA08839E1, 0x51CE794B, 0x2F32C9B7, 0xA01FBAC9,
	            0xE01CC87E, 0xBCC7D1F6, 0xCF0111C3, 0xA1E8AAC7,
	            0x1A908749, 0xD44FBD9A, 0xD0DADECB, 0xD50ADA38,
	            0x0339C32A, 0xC6913667, 0x8DF9317C, 0xE0B12B4F,
	            0xF79E59B7, 0x43F5BB3A, 0xF2D519FF, 0x27D9459C,
	            0xBF97222C, 0x15E6FC2A, 0x0F91FC71, 0x9B941525,
	            0xFAE59361, 0xCEB69CEB, 0xC2A86459, 0x12BAA8D1,
	            0xB6C1075E, 0xE3056A0C, 0x10D25065, 0xCB03A442,
	            0xE0EC6E0E, 0x1698DB3B, 0x4C98A0BE, 0x3278E964,
	            0x9F1F9532, 0xE0D392DF, 0xD3A0342B, 0x8971F21E,
	            0x1B0A7441, 0x4BA3348C, 0xC5BE7120, 0xC37632D8,
	            0xDF359F8D, 0x9B992F2E, 0xE60B6F47, 0x0FE3F11D,
	            0xE54CDA54, 0x1EDAD891, 0xCE6279CF, 0xCD3E7E6F,
	            0x1618B166, 0xFD2C1D05, 0x848FD2C5, 0xF6FB2299,
	            0xF523F357, 0xA6327623, 0x93A83531, 0x56CCCD02,
	            0xACF08162, 0x5A75EBB5, 0x6E163697, 0x88D273CC,
	            0xDE966292, 0x81B949D0, 0x4C50901B, 0x71C65614,
	            0xE6C6C7BD, 0x327A140A, 0x45E1D006, 0xC3F27B9A,
	            0xC9AA53FD, 0x62A80F00, 0xBB25BFE2, 0x35BDD2F6,
	            0x71126905, 0xB2040222, 0xB6CBCF7C, 0xCD769C2B,
	            0x53113EC0, 0x1640E3D3, 0x38ABBD60, 0x2547ADF0,
	            0xBA38209C, 0xF746CE76, 0x77AFA1C5, 0x20756060,
	            0x85CBFE4E, 0x8AE88DD8, 0x7AAAF9B0, 0x4CF9AA7E,
	            0x1948C25C, 0x02FB8A8C, 0x01C36AE4, 0xD6EBE1F9,
	            0x90D4F869, 0xA65CDEA0, 0x3F09252D, 0xC208E69F,
	            0xB74E6132, 0xCE77E25B, 0x578FDFE3, 0x3AC372E6  ]
	    ];

	    var BLOWFISH_CTX = {
	        pbox: [],
	        sbox: []
	    }

	    function F(ctx, x){
	        let a = (x >> 24) & 0xFF;
	        let b = (x >> 16) & 0xFF;
	        let c = (x >> 8) & 0xFF;
	        let d = x & 0xFF;

	        let y = ctx.sbox[0][a] + ctx.sbox[1][b];
	        y = y ^ ctx.sbox[2][c];
	        y = y + ctx.sbox[3][d];

	        return y;
	    }

	    function BlowFish_Encrypt(ctx, left, right){
	        let Xl = left;
	        let Xr = right;
	        let temp;

	        for(let i = 0; i < N; ++i){
	            Xl = Xl ^ ctx.pbox[i];
	            Xr = F(ctx, Xl) ^ Xr;

	            temp = Xl;
	            Xl = Xr;
	            Xr = temp;
	        }

	        temp = Xl;
	        Xl = Xr;
	        Xr = temp;

	        Xr = Xr ^ ctx.pbox[N];
	        Xl = Xl ^ ctx.pbox[N + 1];

	        return {left: Xl, right: Xr};
	    }

	    function BlowFish_Decrypt(ctx, left, right){
	        let Xl = left;
	        let Xr = right;
	        let temp;

	        for(let i = N + 1; i > 1; --i){
	            Xl = Xl ^ ctx.pbox[i];
	            Xr = F(ctx, Xl) ^ Xr;

	            temp = Xl;
	            Xl = Xr;
	            Xr = temp;
	        }

	        temp = Xl;
	        Xl = Xr;
	        Xr = temp;

	        Xr = Xr ^ ctx.pbox[1];
	        Xl = Xl ^ ctx.pbox[0];

	        return {left: Xl, right: Xr};
	    }

	    /**
	     * Initialization ctx's pbox and sbox.
	     *
	     * @param {Object} ctx The object has pbox and sbox.
	     * @param {Array} key An array of 32-bit words.
	     * @param {int} keysize The length of the key.
	     *
	     * @example
	     *
	     *     BlowFishInit(BLOWFISH_CTX, key, 128/32);
	     */
	    function BlowFishInit(ctx, key, keysize)
	    {
	        for(let Row = 0; Row < 4; Row++)
	        {
	            ctx.sbox[Row] = [];
	            for(let Col = 0; Col < 256; Col++)
	            {
	                ctx.sbox[Row][Col] = ORIG_S[Row][Col];
	            }
	        }

	        let keyIndex = 0;
	        for(let index = 0; index < N + 2; index++)
	        {
	            ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
	            keyIndex++;
	            if(keyIndex >= keysize)
	            {
	                keyIndex = 0;
	            }
	        }

	        let Data1 = 0;
	        let Data2 = 0;
	        let res = 0;
	        for(let i = 0; i < N + 2; i += 2)
	        {
	            res = BlowFish_Encrypt(ctx, Data1, Data2);
	            Data1 = res.left;
	            Data2 = res.right;
	            ctx.pbox[i] = Data1;
	            ctx.pbox[i + 1] = Data2;
	        }

	        for(let i = 0; i < 4; i++)
	        {
	            for(let j = 0; j < 256; j += 2)
	            {
	                res = BlowFish_Encrypt(ctx, Data1, Data2);
	                Data1 = res.left;
	                Data2 = res.right;
	                ctx.sbox[i][j] = Data1;
	                ctx.sbox[i][j + 1] = Data2;
	            }
	        }

	        return true;
	    }

	    /**
	     * Blowfish block cipher algorithm.
	     */
	    var Blowfish = C_algo.Blowfish = BlockCipher.extend({
	        _doReset: function () {
	            // Skip reset of nRounds has been set before and key did not change
	            if (this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            //Initialization pbox and sbox
	            BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
	        },

	        encryptBlock: function (M, offset) {
	            var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
	            M[offset] = res.left;
	            M[offset + 1] = res.right;
	        },

	        decryptBlock: function (M, offset) {
	            var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
	            M[offset] = res.left;
	            M[offset + 1] = res.right;
	        },

	        blockSize: 64/32,

	        keySize: 128/32,

	        ivSize: 64/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Blowfish.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Blowfish.decrypt(ciphertext, key, cfg);
	     */
	    C.Blowfish = BlockCipher._createHelper(Blowfish);
	}());


	return CryptoJS;

}));`;
    if (!S) throw new Error("CryptoJS source asset unavailable");
    var U = s.evalCode(S + "\nif (!globalThis.CryptoJS) throw new Error('CryptoJS global unavailable'); true;", "crypto-js.js");
    s.unwrapResult(U).dispose();
    var $ = s.evalCode('["__native_fetch","__native_cancel","__native_log","__parse_url","__get_scraper_id","__get_scraper_settings","__get_tmdb_api_key","__cheerio_load","__cheerio_select","__cheerio_find","__cheerio_text","__cheerio_html","__cheerio_innerHtml","__cheerio_attr","__cheerio_next","__cheerio_prev","__cheerio_parent","__cheerio_children","__cheerio_filter","__cheerio_eq"].forEach(function(name){ try { globalThis[name] = undefined; delete globalThis[name]; } catch (_) {} }); true;', "nuvio-plugin-bridge-cleanup.js");
    s.unwrapResult($).dispose();
    var w = String(u.code || ""), C = typeof TextEncoder == "function" ? new TextEncoder().encode(w).byteLength : unescape(encodeURIComponent(w)).length;
    if (C > Number(r.maxCodeBytes || 1024 * 1024)) throw new Error("Plugin code exceeds quota");
    var O = s.evalCode("var module = { exports: {} }; var exports = module.exports; (function(){\n" + w + "\n})(); globalThis.__pluginModuleExports = module.exports;", String(u.filename || "plugin.js"));
    s.unwrapResult(O).dispose();
    var H;
    function q() {
      if (H) {
        try {
          H.dispose();
        } catch (y) {
        }
        H = null;
      }
    }
    try {
      var ee = s.evalCode("(async function(){ try { var exported = globalThis.__pluginModuleExports || {}; var fn = exported.getStreams || globalThis.getStreams; if (typeof fn !== 'function') return JSON.stringify([]); var args = " + JSON.stringify(u.args || {}) + "; var value = await fn(args.tmdbId, args.mediaType, args.season, args.episode); return JSON.stringify(Array.isArray(value) ? value : []); } catch (_) { try { console.error('getStreams failed:', _); } catch (__) {} return JSON.stringify([]); } })()", "nuvio-plugin-call.js");
      H = s.unwrapResult(ee);
    } catch (y) {
      i.cleanup(), J = null, Re({ type: "pluginLog", level: "error", message: "getStreams invocation failed: " + String((y == null ? void 0 : y.message) || y) }), Re({ type: "result", results: [] });
      return;
    }
    var He, Ce = null;
    try {
      He = await Id(s, A, H, u.timeoutMs);
    } catch (y) {
      Ce = y;
    }
    if (Ce) {
      q(), i.cleanup(), J = null, Re({ type: "pluginLog", level: "error", message: "getStreams promise failed: " + String((Ce == null ? void 0 : Ce.message) || Ce) }), Re({ type: "result", results: [] });
      return;
    }
    q();
    var xt = s.unwrapResult(He), je = s.dump(xt);
    xt.dispose();
    var Le;
    try {
      Le = JSON.parse(typeof je == "string" ? je : String(je || "[]"));
    } catch (y) {
      Re({ type: "pluginLog", level: "error", message: "Plugin returned invalid JSON: " + String((y == null ? void 0 : y.message) || y) }), Le = [];
    }
    Le = Array.isArray(Le) ? Le.slice(0, Number(r.maxResultsPerScraper || 25)) : [], i.cleanup(), J = null, Re({ type: "result", results: Le });
  }
  Ra.onmessage = function(e) {
    var u, r;
    var t = (e == null ? void 0 : e.data) || {};
    if (t.type === "fetchResult" && J) {
      t.error ? (u = J.settleFetch) == null || u.call(J, t.requestId, null, new Error(t.error)) : (r = J.settleFetch) == null || r.call(J, t.requestId, t.payload || {}, null);
      return;
    }
    t.type === "execute" && Cd(t).catch((i) => {
      var n, s;
      J && ((n = J.rejectPending) == null || n.call(J, i), (s = J.cleanup) == null || s.call(J)), J = null, Re({ type: "error", error: String((i == null ? void 0 : i.message) || i) });
    });
  };
})();
