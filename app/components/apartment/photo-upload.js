import Ember from 'ember';

export default Ember.Component.extend({

  imgur: Ember.inject.service(),

  actions: {
    picSubmit (rawFile) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(rawFile.target.files[0])
      fileReader.onload = () => {
        let imageData = fileReader.result
          imageData = imageData.replace('data:image/png;base64', '')
          this.get('imgur').imagePost(imageData).then((result) => {
            const link = result.data.link
	        this.sendAction('createListingPhoto', link)

        }).catch((result) => {
	         console.log(result)
        });
      }

    }
  }
});
