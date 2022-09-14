function getPageInfo (pages, index) {           
    return (index + 1) + ' of ' + (pages.length - 1)
}

function replaceLabel(label){
   return label.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');
}


function getTitle (pdfPages, index) {
    if (pdfPages[index].group && pdfPages[index].group.title) {
        return pdfPages[index].group.title
    } else {
        return ""
    }
}

function getSubtitle (pdfPages, index) {
    if (pdfPages[index].group && pdfPages[index].group.subtitle && pdfPages[index].group.snapshotAsOf) {
        return pdfPages[index].group.subtitle + (pdfPages[index].group.snapshotAsOf || "")
    } else {
        return ""
    }
}

function getHeaderText (pdfPages, index) {
    if (pdfPages[index].group && pdfPages[index].group.msn && pdfPages[index].group.today) {
        return "MSN - " + pdfPages[index].group.msn + " - Investment Memo - " + pdfPages[index].group.today
    } else {
        return ""
    }

}

function tableOfContents (pdfPages) {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    const sections = pdfPages.map((d) => d.group?.title ?? "Blank").filter((d) => d !== "Blank").filter(onlyUnique)

    const contents = [];
 
    for (const section of sections) {
        let firstPageOfSection = 0;
        let firstPageSeen = false;
        for (let i = 0; i < pdfPages.length; i++){
            if (pdfPages[i].group?.title === section) {
                if(!firstPageSeen) {
                    firstPageOfSection = i + 1;
                    firstPageSeen = true;
                }
            }
        }
        contents.push({
            sectionName: section,
            firstPageOfSection: firstPageOfSection
        })
    }
    console.log(contents);
    return contents;
}

function getReportName(pdfPages) {
    if (pdfPages[pdfPages.length-1] && pdfPages[pdfPages.length-1].group && pdfPages[pdfPages.length-1].group.reportName) {
        return pdfPages[pdfPages.length-1].group.reportName
    } else {
        return ""
    }
}