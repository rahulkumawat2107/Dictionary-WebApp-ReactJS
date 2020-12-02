import React, {Component} from "react"
import Word from "./Word"

class Content extends Component {
    constructor(){
        super()
        this.state = {
            results: "",
            word: "",
            definition:"",
            text:"",
            meaning:"",
            wordArray:[],
            phonetics: "",
            audio: "",   

            adjective_definition:"",
            exclamation_example:"",

            adverb_definition:"",
            noun_example:"",

            noun_definition:"",
            verb_example:"",

            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.getMeaning = this.getMeaning.bind(this)
        this.togglePlay = this.togglePlay.bind(this)
    }

    componentDidMount() {
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
        .then( response => response.json())
        .then(response => {
            this.setState({
                results : response
            })
        })
    }

    handleChange(event) {
        const {value} = event.target
        this.setState({
            word : value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            word : this.state.word
        })
        
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+this.state.word)
            .then(response =>  response.json())
            .then(response => {
                console.log("Resp",response);
                this.setState({
                    results: response,
                    definition: (response[0] && response[0].meanings[0] && response[0].meanings[0].definitions[0]) ? response[0].meanings[0].definitions[0].definition : "",
                    phonetics: response[0].phonetics[0].text,
                    audio: new Audio(response[0].phonetics[0].audio),

                    adjective_definition: (response[0] && response[0].meanings[0] && response[0].meanings[0].definitions[0]) ? response[0].meanings[0].definitions[0].definition : "",
                    adverb_definition: (response[0] && response[0].meanings[1] && response[0].meanings[1].definitions[0]) ? response[0].meanings[1].definitions[0].definition : "",
                    noun_definition: (response[0] && response[0].meanings[2] && response[0].meanings[2].definitions[0]) ? response[0].meanings[2].definitions[0].definition : "",

                    // exclamation_example: response[0].meanings[0].definitions[0].example,
                    // noun_example: response[0].meanings[1].definitions[0].example,
                    // verb_example: response[0].meanings[2].definitions[0].example,
                    loading: false
                })
            })
    }

    fileUpload(e) {
        let files = e.target.files;
        let reader = new FileReader();
        
        reader.readAsText(files[0]);
        reader.onload=(e)=>{

            let strFile = JSON.stringify(e.target.result);
            let arr = strFile.split(" ");
            
            this.setState({
                wordArray: arr,
                text: e.target.result,
            })
        }
    }

    getMeaning(e) {
        let val = e.target.innerText;
        fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+val)
            .then(response =>  response.json())
            .then(response => {
                this.setState({
                    meaning: response[0].meanings[0].definitions[0].definition,
                })
            })
    }

    renderWords() {
        const val = this.state.wordArray.map((item, index) => <Word key={index} getMeaning = {this.getMeaning} val = {item}/>)
        return(
            <div>
                {val}
            </div>
        )
    }

    togglePlay() {
        console.log(this.state.audio)
        this.state.audio.play();
    }

    render(){

        return(
            <div className="main-container">

                    
                <div className="input-section">
                    <h2>Search for a word</h2>
                    <form onSubmit = {this.handleSubmit}>
                        <input
                            name = "your_word"
                            placeholder = "Search for word here"
                            onChange = {this.handleChange}>
                        </input>
                        <button
                            type = "submit"
                            value = "Submit">Submit
                        </button>
                    </form>

                    <h2>OR</h2>

                    <h2>Input your text file here</h2>
                    <input type="file" name="file" onChange={(e) => this.fileUpload(e)}></input>

                </div>
                <div className="output-section">
                    {this.state.loading === true && <div>
                        <h1>Defination: Please enter a word to get meaning</h1>
                        </div> }
                    {this.state.loading === false && <div>

                        <p>Meaning of {this.state.word} in English:</p>
                        <h1>{this.state.word}</h1>

                        <p>Pronounciation : {this.state.phonetics}</p>
                        <button onClick={this.togglePlay}>Pronounce</button>
                        <audio src={this.state.audio}>      <button>     Pronounce</button>        </audio>

                        <h2>Adjective</h2>
                        <p>Defination : {this.state.adjective_definition} </p>
                        <p>Example : {this.state.exclamation_example}</p>

                        <h2>Adverb</h2>
                        <p>Defination : {this.state.adverb_definition} </p>
                        <p>Example : {this.state.noun_example}</p>
                        <p>Synonyms</p>

                        <h2>Noun</h2>
                        <p>Defination : {this.state.noun_definition} </p>
                        <p>Example : {this.state.verb_example}</p>
                        
                        </div>}

                    

                    {/* <p onClick={(e) => this.getMeaning(e)}>{this.state.text}</p> */}
                
                    {this.renderWords()}

                    <p>{this.state.meaning}</p>
                    
                </div>
            </div>
        )
    }
}

export default Content