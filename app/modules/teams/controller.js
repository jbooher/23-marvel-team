import Character from './Character';

class TeamsController {

	constructor($http) {
    this._$http = $http;
		this.name = "";
		this.characters = [];
	}

  addCharacter() {
		this._$http
			.get(`http://gateway.marvel.com:80/v1/public/characters?name=${this.name}&apikey=6e7bd33438a14b84d91097cd3cfc46b5`)
			.then((response) => {
				console.log(response);
				let char = new Character(
					response.data.data.results[0].name,
					response.data.data.results[0].description,
					`${response.data.data.results[0].thumbnail.path}.${response.data.data.results[0].thumbnail.extension}`);
				console.log(char);

				if(this.validateAdd(char)) {
					this.characters.push(char);
				}

				console.log(this.characters);
				this.name = "";
			}).catch((error) => {
				console.log(`Error: ${error}`);
				alert(`Could not find that hero: ${this.name}`)
			})

  }

  deleteCharacter(character) {
		this.characters.splice(this.characters.indexOf(character), 1);
  }

	validateAdd(char){
		console.log("validating");
		let valid = true

		this.characters.forEach((character) => {
			console.log(character.name);
			console.log(char.name);

			if (character.name === char.name) {
				alert("You have already added that character");
				valid = false;
			}
		});

		return valid;
	}

}

export default TeamsController;
