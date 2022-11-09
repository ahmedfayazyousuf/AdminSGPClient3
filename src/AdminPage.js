import React, { useState,useEffect} from "react";
import "./styles.css";
import { Button } from "react-bootstrap";


const AdminPage = () => {
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [user,setUser] = useState({
      timetaken:"10"
  });

  const [hidden, setHidden] = useState(false);

  // eslint-disable-next-line
  let timetaken, value;

    const handleInputs = (e) => {
        value = e.target.value;

        setUser({'timetaken':value})
        console.log(user);
    }


  const GetData = async () => {
    //object destruction so dont need to write user.name etc again and again

    
    const res = await fetch(`https://sailgp3server.herokuapp.com/api/getAllTime`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await res.json();

    
    setData(data);
    console.log(data)

    if(data.status === 422 || !data) {
        
        console.log("Invalid Credentials - If error persists, contact admin");
    } else {
       
        console.log("Registration Successful! Welcome Aboard!");

        // history("/login");
    }

}

useEffect(()=>{
    GetData();
},[])



function PostData(id) {
  //object destruction so dont need to write user.name etc again and again
  const { timetaken } = user;
  // console.log(timetaken)
  // console.log(data)


  console.log(id)
  fetch(`https://sailgp3server.herokuapp.com/api/update/${id}`, {
    method: 'PUT',
    headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "*",
            },
    body:JSON.stringify({ 
      timetaken
  })
  })
};


  return (
    <div className="container">
      <div className="row">
        <div style={{
          alignItems: 'right',
          justifyContent: 'right',

        }}>
          <h5 style={{color: 'white', marginTop: '15px'}}>SailGP - Admin Control</h5>
          <Button variant="outlined" href="https://sailgp3.vercel.app/leaderboard2"
            style={{
                backgroundColor: '#495151',
                color: 'white',
                borderColor: 'white',
                marginRight: '5px',
                padding: '10px',
                alignSelf: 'right',

              }}
              >
                Leaderboard
          </Button>
        </div>

        <div className="col-12 my-2">
          <table className="table table-hover table-dark" 
          style={{
            color: '#fff',
            borderRadius: '5px',
          }}
          >
            <thead>
              <tr>
                <td>Name</td>
                <td>Reg. Time</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>                    
                      <td>{user.createdAt}</td>
                      <td style={{
                        textAlign: 'center'
                      }}>
                        <div className="my-2 d-flex flex-column">
                          <Button variant="outlined" value={user._id}  onClick={(e)=>  {

                            if(hidden===false){
                              document.getElementById(e.target.value).style.visibility = "visible";
                              setHidden(!hidden)
                            }
                            else{
                              document.getElementById(e.target.value).style.visibility = "hidden";
                              setHidden(!hidden)
                            }
                            
                            
                            }}
                          style={{
                            backgroundColor: '#495151',
                            color: 'white',
                            borderColor: 'white',
                            marginRight: '5px',
                            textDecoration: 'none',
                          }}
                          >
                            Enter Score
                          </Button>

                          <div className="popup" id={user._id} style={{visibility:"hidden"}}>
                            <p className="txt4" id="pt1" style={{marginTop: '10px', marginBottom:'3px'}}>Enter Time Taken</p>
                            <div style={{textAlign: 'center', justifyContent: 'center'}}>
                              <input type="number" name="phone" id="phone" placeholder="seconds" onChange={handleInputs} required
                              style={{
                                  borderRadius: '0',
                                  transform: 'skewX(-15deg)',
                                  width: '80%',
                                  padding: '5px',
                                
                              }}/>
                            </div>
                            <button className="scorebutton" value={user._id} name="Desk" onClick={(e) => {
                              PostData(e.target.value);
                              document.getElementById(e.target.value).style.visibility = "hidden";
                            }}
                            style={{
                              marginTop: '10px',
                              backgroundColor: 'white',
                              fontWeight: '800'
                            }}>SUBMIT</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
            </tbody>
          </table>
        
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

