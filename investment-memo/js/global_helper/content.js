// Use the "beforeRender" or "afterRender" hook
// to manipulate and control the report generation
//async function beforeRender (req, res) {
//
//}
const jsreport = require('jsreport-proxy')

function inspector (pdfObject) {

    return "ABC"
}

function getPageInfo (pages, index) {
    const group = pages[index].group
    
    let gstart = index
    while (gstart - 1 > -1 && pages[gstart - 1].group === group) {
        gstart--
    }

    let gend = index
    while ((gend + 1 < pages.length) && pages[gend + 1].group === group) {
        gend++
    }
           
    return (index - gstart + 1) + ' of ' + (gend - gstart + 1)
}

async function afterRender(req, res) {
    // get number of pages
    // delete the last one
    const document = await jsreport.pdfUtils.parse(res.content)
    res.content = await jsreport.pdfUtils.removePages(res.content, document.pages.length)
}