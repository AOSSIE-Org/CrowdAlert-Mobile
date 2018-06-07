import firebase from 'react-native-firebase';
/**
 * Used to push incident to firebase
 * @param  {json}  incident contains all incident details
 * @return           Adds incident to firebase
 */
export const AddIncidentFirebase = async incident => {
	console.log(incident);
	firebase
		.database()
		.ref()
		.child('incidents')
		.push(incident)
		.then(result => {
			console.log('Uploaded to firebase');
		})
		.catch(error => {
			console.log(error);
		});
};
/**
 * Fetch incidents from firebase.
 * @return  returns items to addIncident page for updating markers on the map .
 */
export const GetIncidentFirebase = async () => {
	var items = [];
	firebase
		.database()
		.ref('incidents')
		.on('value', snap => {
			// get children as an array
			snap.forEach(child => {
				//console.log(child);
				if (child.val().visible == true) {
					items.push({
						title: child.val().title,
						key: child.key,
						value: child.val()
					});
				}
			});
		});
	console.log(items);
	return items;
};
