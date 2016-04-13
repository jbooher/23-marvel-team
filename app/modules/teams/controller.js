import Character from './Character';

class TeamsController {

	constructor($http) {
    this._$http = $http;
		this.name = "";
		this.characters = [];
		this.previewName = "";
	}

	previewCharacter() {
			this._$http
				.get(`http://localhost:8000/v1/public/characters?name=${this.name}`)
				.then((response) => {
					console.log(response);
					this.character = response.data.data.results[0];
					if(this.validateAdd(this.character)) {
						this.previewName = this.character.name;
						this.previewDesc = this.character.description;
						this.previewImage = `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
					}
			}).catch((error) => {
				console.log(`Error: ${error}`);
				alert(`Could not find that hero: ${this.name}`);
			});
	}

	previewRemove() {
		this.previewName = "";
		this.name = "";
	}

  addCharacter() {
		this.previewName = "";
		this.name = "";

		let char = new Character(
			this.character.name,
			this.character.description,
			`${this.character.thumbnail.path}.${this.character.thumbnail.extension}`);

		this.characters.push(char);

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
