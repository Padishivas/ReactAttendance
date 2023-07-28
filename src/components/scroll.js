import React, { useEffect, useState } from "react";
import "../styles/scroll.css";
import { AiOutlineClockCircle } from "react-icons/ai";

const ScrollBarExample = () => {
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
                setAttendanceData(
                  sortedData.map((e) => {
                    let tm = true;
                    const hours = parseInt(e.time.split(":")[0]);
                    const minutes = parseInt(e.time.split(":")[1]);
                    if (hours == 10) {
                      if (minutes > 5) tm = false;
                    } else if(hours !== 9){
                      tm = false;
                    }
                    return {...e,tm}
                  })
                );
                console.log(attendanceData);
              }
            );
          })
          .catch((err) => console.log(err));
    }, []);

    const salary = () => {
        let absents = 0;
        let late = attendanceData.filter(e => !e.tm).length;
        setDte(400*attendanceData.length - (late/3*400))
    };
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

  return (
    <div className="scroll-container">
      <div className="scroll-content">
          <p>Salary = {dte}</p>
              <button type="button" onClick={salary}>Get Salary</button>
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
  );
};

export default ScrollBarExample;
