/**
 * 
 */
if(parametersData.profile != undefined 
		&& parametersData.profile.managers != undefined && parametersData.profile.managers.length > 0) {
	$("#parametersDisplayUncumuledInput").val(parametersData.profile.managers[0].manager.uncumuledInput);
	$("#parametersDisplayHighlightExAequo").val(parametersData.profile.managers[0].manager.highlightExAequo);
}