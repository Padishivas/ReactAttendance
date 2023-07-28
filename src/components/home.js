import React, { useEffect, useState , useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsBoxArrowInDownRight } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";
import "../styles/scroll.css";
import { AiOutlineClockCircle } from "react-icons/ai";

const Home = () => {
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem("loggedin"));
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }

    
    const [input,setInput] = useState({
        name:"",
        email:"",
        date:"",
        time:""
    })
    const regForm = useRef();
    const email = localStorage.getItem("email");
    const t=new Date().toString();
    const date=t.split(" ")[1]+ " "+t.split(" ")[2]+" "+t.split(" ")[3];
    const time=t.split(" ")[4];

    const handleSubmit = (e) => {
        e.preventDefault();
        // navigate("/login");

        const baseUrl = "https://students.codex.today/attendance/add";
        fetch(baseUrl, {
            method : "POST",
            headers: {
                "Content-Type":"application/json",
                'Authorization': `Bearer ${(localStorage.getItem('token'))}`
            },
            body: JSON.stringify({"date": date,time})
        })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

    };


    //------------------------------------- ScrollBar Section Open---------------------------------

    const [attendanceData, setAttendanceData] = useState([]);
    const [dte, setDte] = useState("");

    const dt = () => {
        let arr = [];
        for (let i = 1; i < 32; i++) {
            let hr = 10 - parseInt(Math.random() * 2);
            if (hr == 9) hr = "0" + hr;
            let mins = parseInt(Math.random() * 60);
            if (mins < 10) mins = "0" + mins;
            let day = i;
            if (day < 10) day = "0" + day;
            arr.push({ time: hr + ":" + mins, date: "May" + " " + day + " " + 2023 });
        }
        return arr;
    };
    const [timing,setTiming] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("token");
        const baseUrl = "https://students.codex.today/users/user";
        fetch(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const attendanceIds = data.attendance;
            const attendanceDataPromise = attendanceIds.map((e) => {
              return new Promise(async (resolve, reject) => {
                try {
                  const res = await fetch(
                    "https://students.codex.today/attendance/attendance/" + e,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                      },
                    }
                  );
                  resolve(await res.json());
                } catch (err) {
                  reject(`Error fetching data from server:${err}`);
                }
              });
            });
            const attData = Promise.allSettled(attendanceDataPromise).then(
              (data) => {
                const res = data.map((e) => e.value);
                const sortedData = res.sort((a, b) => {
                  // return parseInt(a.date.split(" ")[1]) - parseInt(b.date.split(" ")[1])
                  return new Date(a.date).getTime() - new Date(b.date).getTime();
                });
                    let avgt=0;
                    let hrs = 0;
                    let mnts = 0;
                    sortedData.map((e) => {
                        let tm = true;
                        const hours = parseInt(e.time.split(":")[0]);
                        const minutes = parseInt(e.time.split(":")[1]);
                            hrs +=  hours;
                           mnts +=  minutes;
                    })
                    let avgHrs = hrs/sortedData.length;
                    let avgMins = (mnts/sortedData.length) + (parseFloat("."+avgHrs.toString().split(".")[1])*60)/(sortedData.length)
                    
                    console.log((parseFloat("."+avgHrs.toString().split(".")[1])*60)/(sortedData.length));
                    setTiming({
                        hrs: parseInt(avgHrs),
                        mins: parseInt(avgMins)
                    })
                setAttendanceData(
                  sortedData.map((e) => {
                    let tm = true;
                    const hours = parseInt(e.time.split(":")[0]);
                    const minutes = parseInt(e.time.split(":")[1]);
                        hrs +=  hours;
                       mnts +=  minutes;
                       console.log(hrs);
                    // setTiming({
                    //     hrs :hrs,
                    //     mnts:mnts
                    // })
                   
                    if (hours == 10) {
                      if (minutes > 5) tm = false;
                    } else if(hours !== 9){
                      tm = false;
                    }
                    return {...e,tm}
                  })
                )
                //     let avgt=0;
                //     let hrs = 0;
                //     let mnts = 0;
                //    attendanceData&&attendanceData.map((e)=>{
            
                //        const hours = parseInt(e.time.split(":")[0]);
                //        const minutes = parseInt(e.time.split(":")[1]);
                //        hrs += hrs + hours;
                //        mnts += mnts + minutes;
                     
                
                //    })
                
                console.log(attendanceData);
              }
            );
          })
          .catch((err) => console.log(err));
    }, []);

    const salary = () => {
        let late = attendanceData.filter(e => !e.tm).length;
        setDte(1000*attendanceData.length - (late/3*1000))
    };

    // console.log(attendanceData);
    // console.log(attendanceData[0].time);


    console.log(timing.hrs)
    


  //   useEffect(() => {
  //     const dat = dt();
  //     const token = localStorage.getItem("token");
  //     const attPromise = dat.map((e) => {
  //       return new Promise(async (resolve, reject) => {
  //         try {
  //           const baseUrl = "https://students.codex.today/attendance/add";
  //           const res = await fetch(baseUrl, {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //             body: JSON.stringify(e),
  //           });
  //           resolve(await res.json());
  //         } catch (err) {
  //           reject(`Error fetching data from server:${err}`);
  //         }
  //       });
  //     });
  //     const attData = Promise.allSettled(attPromise).then(
  //         (data) => {
  //           console.log(attData);
  //         }
  //       );
  //   }, []);

    //------------------------------------- Scrollbar Section Close--------------------------------
   

    return (
        <div className="home">
            <div className="homeleft">
                <form onSubmit={handleSubmit} ref={regForm} action="" className="add">
                    <div>
                        <label>Employee Name</label>
                        <input name="name" value={input.name} 
                            onChange={(e) => setInput({...input,[e.target.name]: e.target.value})} className="inp" type="text" id="nm"/>
                    </div>
                    <div>
                        <label>Employee Email</label>
                        <input name="email" value={email} disabled className="inp"/>
                    </div>
                    <div>
                        <label>Date</label>
                        <input name="date" value={date} disabled className="inp"/>
                    </div>
                    <div>
                        <label>Time</label>
                        <input name="time" value={time} disabled className="inp"/>
                    </div>
                    
                    <div className="buttons"><button className="btnadd" type="submit">Add Attendance</button><button onClick={handleLogout} type="button">Logout</button></div>
                </form>

                <div className="salarybox">
                    <button type="button" onClick={salary}>Get Salary</button>
                    <p className="sal"><span className="sal1">Salary = </span><span className="sal2">{dte}</span></p>
                </div>
            </div>

            <div className="homeright">

                {/* <div className="head">
                    <h1>Welcome - {userName.name}</h1>
                    
                </div> */}
                <div className="top">
                    <div className="tl1">
                        <div className="vl"></div>
                        <h4 className="t1">Detail Employee</h4>
                    </div>

                    <div className="tl2">
                        <div style={{width:"10%"}}>
                            <img className="pk" src="https://w0.peakpx.com/wallpaper/388/134/HD-wallpaper-pspk-in-beard-smile-pspk-beard-pawan-kalyan.jpg"/>
                        </div>
                        <div style={{width:"90%",display:"flex",flexDirection:"column",rowGap:"10px"}}>
                            <h4 className="t2">{userName.name}</h4>
                            <div className="tl2details">
                                <div>
                                    <h5>Role</h5>
                                    <p>Frontend Developer</p>
                                </div>
                                <div>
                                    <h5>Phone Number</h5>
                                    <p>(+91) 9876543210</p>
                                </div>
                                <div>
                                    <h5>Email Address</h5>
                                    <p>frontenddeveloper@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tl3">
                        <div className="b1">
                            <div className="icons"><RiLogoutCircleRLine /></div>
                            <div>
                                <h3>{attendanceData.length}</h3>
                                <p>Total attendance</p>
                            </div>
                        </div>
                        <div className="b1">
                            <div className="icons"><BsBoxArrowInDownRight /></div>
                            <div>
                                <h3 >{timing.hrs}:{timing.mins}</h3>
                                <p>Avg Check in Time</p>
                            </div>
                        </div>
                        <div className="b1">
                            <div className="icons"><BsBoxArrowUpRight /></div>
                                <div>
                                    <h3>--</h3>
                                    <p>Avg Check out Time</p>
                                </div>
                        </div>
                        <div className="b1"></div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="tl1">
                        <div className="vl"></div>
                        <h4 className="t1">Attendance History</h4>
                    </div>
{/* Scrollbar section Start */}

<div className="scroll-container">
      <div className="scroll-content">
          {/* <p>Salary = {dte}</p>
              <button type="button" onClick={salary}>Get Salary</button> */}
        <div className="scr">
          {attendanceData.map((e) => {
            return (
              // <div className="b" key={e._id}>
              //   <AiOutlineClockCircle />
              //   {e.date}
              //   {e.time}
              //   {e.tm ? "OnTime" : "Late"}
              // </div>

              // <div className="b" key={e.id}>
              //   <div className="b1"><div className="icon"><AiOutlineClockCircle /></div><div className="dt">{e.date}</div><div>{e.tm ? <div className="ontime">OnTime</div> : <div className="late">Late</div>}</div></div>
              //   <div><h3>Check in Time</h3>{e.time}</div>
              // </div>
              <div className="b" key={e._id}>
                
                <div className="dt"><AiOutlineClockCircle />{e.date}{e.tm ? <div className="ontime">OnTime</div> : <div className="late">Late</div>}</div>
                <div><p>Check in Time</p>{e.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>           

{/* Scrollbar Section End */}
                </div>
            </div>
        </div>
    )
}

export default Home;

