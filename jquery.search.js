// IIFE - Immediately Invoked Function Expression
_spBodyOnLoadFunctionNames.push("removeRefinerCollapse");

function toHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
}
function refineClick(materialCategory) {
    var refinerID = $("div[refinername='RefinableString01']").attr('id');
    var hexCat = toHex(materialCategory);
    $getClientControl(document.getElementById(refinerID)).updateRefinersJSON('{"RefinableString01":[\u0022\\\u0022\u01C2\u01C2' + hexCat + '\\\u0022\u0022]}');
    return false;
}
function removeRefinerCollapse() {
    //$(".ms-ref-refinername").removeAttr("onclick");
    $(".ms-ref-refinername").each(function () {

        var curOnClick = $(this).attr("onclick");
        var sIndx = curOnClick.lastIndexOf(",");
        var eIndex = curOnClick.lastIndexOf(")");
        var refiner = curOnClick.substring(sIndx + 2, eIndex)
        var newFunction = "expandFilters(this.parentNode, " + refiner + ")";
        $(this).attr("onclick", newFunction);
    })
}
function expandFilters(parentNode, refinerName) {

    var e = parentNode.querySelector(".ms-ref-uparrow, .ms-ref-downarrow"),
        b = parentNode.querySelector(".ms-ref-allSec"),
        a = parentNode.querySelector(".ms-ref-unselSec");
    e.className = "ms-ref-uparrow";
    if (b) b.style.display = "";
    a.style.display = "";
    Srch.Refinement.setExpanded(refinerName, "true")

}
function clearAllFilters() {

    var hash = window.location.hash;
    if (hash.indexOf('Default') == 1) {
        hash = unescape(hash)
        var kIdx = hash.indexOf('"k":');
        var rIdx = hash.indexOf('","');
        var query = hash.substring(kIdx + 5, rIdx);
        query = query.replace(/\\/g, '');
        window.location.href = window.location.pathname + window.location.search + '#k=' + escape(query);
    } else {
        window.location.href = window.location.pathname + window.location.search + "#";
    }

}
$(function (){

	var path = window.location.pathname;
	var startIndx = path.lastIndexOf("/");
	var endIndx = path.indexOf(".aspx");
	var searchPage = path.substring(startIndx+1, endIndx);

	switch(searchPage){

		case "RecentlyUpdated":
			$("#searchTitleText").text("Recently Updated");
			break;
		case "AllFeatured":
			$("#searchTitleText").text("The Line Up");
			break;
		default:
			$("#searchTitleText").text("Results");

	}
});