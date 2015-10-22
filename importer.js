/*
_IMPORTS = {}
_VALID_NAMES = ['stdlib']
def read_file(fname):
    if (!(_VALID_NAMES.indexOf(fname) >= 0)):
        #Don't even try to import a name we do not know
        throw "Cannot Import " + fname;
    if (!(fname in _IMPORTS)):
        request = new XMLHttpRequest();
        # `false` makes the request synchronous
        request.open('GET', '/rapydscript/src/'+fname+'.pyj', false)
        request.send(null)
        if (request.status is 200):
            _IMPORTS[fname] = request.responseText
        else:
            throw "404 (File not found)"

    return _IMPORTS[fname]
*/

_IMPORTS = {};

console.log('reading');

function import_read_file(fname) {
    console.log('reading', fname);
    var request;
    if (!(fname in _IMPORTS)) {
        request = new XMLHttpRequest();
        request.open("GET", "/src/lib/" + fname+'.pyj', false);
        request.send(null);
        if (request.status === 200) {
            _IMPORTS[fname] = request.responseText;
        } else {
            throw "404 (File not found)";
        }
    }
    return _IMPORTS[fname];
}


// prepare a splat to be injected into the code
function splat_baselib(name, body) {
    return new AST_Splat({
        module: new AST_SymbolVar({
            name: name
        }),
        body: new AST_Toplevel({
            start: body[0].start,
            body: body,
            strict: true,
            end: body[body.length-1].end
        })
    });
}



parse_baselib = function() {
    var baselibAst;
    baselibAst = parse( import_read_file('../baselib'));

    // we don't want to dump the baselib yet, we want to process it in pieces and splat
    // them as needed
    var hash = baselibAst.body[baselibAst.body.length-1];
    var data = hash.body.properties;
    var baselibList = {};
    data.forEach(function(item) {
//        item.dump(1, ['start', 'end'], false);
//        item.dump(9, ['start', 'end'], true);
        var key = item.key;
        // if this is named a function, use it as a whole, if it's anonymous assume a scope
        var value = item.value.name ? [item.value] : item.value.body;
        baselibList[key] = splat_baselib(key, value);
    });

    return baselibList;
};


