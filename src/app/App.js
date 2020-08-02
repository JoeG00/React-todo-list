import React, { Component } from 'react'

export class App extends Component {
    constructor(){
        super();
       this.state={
            title:'',
            description:'',
            tasks:[],
            _id:""
        }

        this.addtask=this.addtask.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.fetchTasks=this.fetchTasks.bind(this);



    }
    handleChange(e){

        const {name, value}=e.target;
        this.setState({
            [name]:value
        })

    }

    componentDidMount(){
        this.fetchTasks()
    }


    fetchTasks(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data=> {
            console.log(data)
            this.setState({tasks: data})
        
        })
    }
    addtask(e){
        if (this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                },
                body:JSON.stringify(this.state)

            })

            .then(res=> res.json())
            .then(data=> {
                M.toast({html:'Task updated'});

                console.log(data)
                this.setState({title:'', description:'', _id:''});
                this.fetchTasks();

            })
            e.preventDefault()



        } else{
            fetch('/api/tasks', {
                method:'POST',
                body:JSON.stringify(this.state),
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Access-Control-Allow-Origin': '*'
    
                },
    
            })
                .then(res => res.json())
                .then(data =>{
                    M.toast({html:'Task Saved'});
                    this.setState({title:'', description:''});
                    this.fetchTasks()
    
                })
                .catch(err => console.log(err));
    
            e.preventDefault()
        }
        

    }

    update(id){

        fetch(`/api/tasks/${id}`)
            .then(res=>res.json())
            .then(data=> {
                this.setState({
                    title:data.title,
                    description:data.description,
                    _id:data._id
                })

            })

    }

    delete(id){

        if(confirm("Are you sure you wan to delete it?")){
            // console.log(id)
            fetch(`/api/tasks/${id}`,{
                method:"DELETE",
                headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                    
                }
            })
                .then(res=> res.json())  
                .then(data=>{
                    M.toast({html:'Task deleted'}),
                    this.fetchTasks()})
                
        }


    }




    render() {
        return (
            <div>
                {/* Navigation */}
            <nav className="light-blue darken-4">
                <a className="brand-logo" href=''>mern stack</a>
            </nav>
            <div className='container'>
                <div className='row'>
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.addtask}>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input name= "title"type="text" placeholder="Task Title" value={this.state.title} onChange={this.handleChange}/>
                                            <textarea  name= "description" placeholder="Description" className="materialize-textarea" value={this.state.description} onChange={this.handleChange}></textarea>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">Send</button>
                                    </div>
                                </form>
                            </div>
        
                        </div>

                    </div>
                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(task=>{
                                    return (<tr key={task._id}>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td style={{display:'flex'}}> 
                                            <button className= "btn light-blue darken-4" style={{margin:'4px'}}><i className="material-icons" onClick={()=> this.delete(task._id)}>delete</i></button>
                                            <button className= "btn light-blue darken-4" style={{margin:'4px'}}><i className="material-icons" onClick={()=> this.update(task._id)}>edit</i></button>
                                        </td>
                                    </tr>)
                                    })
                                }

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>  
        </div>
        )
    }
}

export default App
