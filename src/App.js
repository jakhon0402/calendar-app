import "./index.css"
import {useEffect, useState} from "react";
import {motion, useAnimation, AnimatePresence} from "framer-motion";
import "./style.css"
import Week from "./components/Week";

function App() {
    const today = new Date()
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [day,setDay] = useState(today.getDay())
    const weeks = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const months = [31,28,31,30,31,30,31,31,30,31,30,31]
    const [days,setDays] = useState([])
    const [isNext,setIsNext] = useState(false)

    const [direction,setDirection] = useState(0)
    const [directionY,setDirectionY] = useState(0)


    const control = useAnimation()

    const yearVariants = {
        initial:direction => {
            return {
                y:direction>0?30:-30, opacity:0,scale:0.5
            }
        },
        animate:{
            y:0,opacity:1,scale:1
        },
        exit:direction => {
            return {
                y:direction>0?-30:30, opacity:0,scale:0.5
            }
        }
    }

    const monthVariants = {
        initial:direction => {
                return {
                    x:direction>0?50:-50, opacity:0,scale:0.5
                 }
                },
        animate:{
            x:0,opacity:1,scale:1
        },
        exit:direction => {
            return {
                x:direction>0?-50:50, opacity:0,scale:0.5
            }
        }
    }

    const nextMonth = () =>{
        setDirection(1)
        if(month==11){
            setMonth(0)
            setYear(prev=>prev+1)
            setDirectionY(-1)
        }
        else setMonth(prev=>prev+1)

    }

    const prevMonth = ()=>{
        setDirection(-1)
        if(month==0){
            setMonth(11)
            setYear(prev=>prev-1)
            setDirectionY(1)
        }
        else setMonth(prev=>prev-1)
    }

    useEffect(()=>{
        setFebDays()
        setDays([])
        setDaysArray()
    },[])

    // useEffect(()=>{
    //     controls.stop({scale :0,opacity:0})
    //     controls.start({scale :1,opacity:1})
    //
    // },[month,year])
    // useEffect(()=>{
    //     controls.stop({scale :0,opacity:0})
    //     controls.start({scale :1,opacity:1})
    // },[])

    const setFebDays = () => {
        if(new Date(year,1,29).getMonth()==1){
            months[1] = 29
        }
        else months[1] = 28
    }


    const setDaysArray = ()=>{
        const calendarDays = []
        let daysLength = 0
        let firstDayOfMonth = new Date(year,month,1).getDay()
        let lastDays
        if(firstDayOfMonth==0)
            lastDays = 6
        lastDays = firstDayOfMonth-1
        let lastMonth = month == 0 ? 11 : month-1
        let nextMonth = month == 11 ? 0 : month + 1
        let lastYear = month == 0 ? year - 1 : year
        let nextYear = month == 11 ? year+1 : year
        for(let i = months[lastMonth] - lastDays + 1; i<=months[lastMonth];i++){
            calendarDays.push({dayKey:i,isThisMonth:false,date:new Date(lastYear,lastMonth,i).toLocaleDateString()})
            ++daysLength
        }
        for (let i = 1;i<=months[month];i++){
            calendarDays.push({dayKey:i,isThisMonth:true,date:new Date(year,month,i).toLocaleDateString()})
            ++daysLength
        }

        for(let i = 1; i<10;i++){
            if(daysLength % 7 == 0)
                break
            calendarDays.push({dayKey:i,isThisMonth:false,date:new Date(nextYear,nextMonth,i).toLocaleDateString()})
            ++daysLength
        }
        control.start({opacity:[0,1]})
        setDays(calendarDays)
    }




    useEffect(()=>{
        setFebDays()
        setDays([])
        setDaysArray()
    },[month,year])





    return (
    <div className="grid bg-[#111] w-screen h-screen fixed items-center justify-center">
        {/*<div className="fixed grid w-full h-full -z-10  px-[30%] py-[5%] ">*/}
        {/*    <div className="relative w-60 h-60 bg-indigo-700 blur-xl blur-3xl"></div>*/}
        {/*    <div className="relative w-60 h-60 bg-yellow-500 blur-xl blur-3xl "></div>*/}

        {/*</div>*/}
      <div className="md:w-[500px] md:h-[600px] sm:w-[300px] sm:h-[360px] bg-[#222222] rounded-2xl p-3 border-[1px] border-[#555] drop-shadow-[0_5px_55px_rgba(120,120,120,0.3)]">
        <div className="flex flex-row h-[13%] w-full md:px-5 sm:px-2">
            <div className="flex flex-col w-[60%] h-full ">
                <h1 className="flex items-end h-[62%]  md:text-3xl sm:text-lg font-bold text-neutral-200">{`${today.getDate()} ${monthNames[today.getMonth()].substring(0,3)} ${today.getFullYear()}`}</h1>
                <h1 className="flex items-top h-[38%] md:text-xl sm:text-sm text-neutral-400 font-thin">{weeks[day]}</h1>

            </div>
            <div className="flex flex-row justify-between w-[40%] h-hull p-1 gap-1">
                <div className="relative md:top-1/2 md:left-[45%] sm:left-[25%] sm:top-1/4">
                    <AnimatePresence initial={false} custom={directionY}>
                        <motion.div key={year} variants={yearVariants} animate='animate' initial='initial' exit='exit' transition={{duration:0.3}} custom={directionY} className="absolute w-30 text-neutral-400 font-bold md:text-2xl sm:text-lg">{year}</motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex flex-col justify-end items-end text-white font-bold text-2xl md:w-[15%] sm:w-[25%] h-full gap-1 px-1">
                    <motion.button whileTap={{scale:0.8}} className="w-full bg-neutral-700 flex justify-center items-center rounded" onClick={() => {
                        setYear(prev => prev + 1); setDirectionY(-1) ;

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 stroke-neutral-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    </motion.button>
                    <motion.button whileTap={{scale:0.8}} className="w-full bg-neutral-700 flex justify-center items-center rounded" onClick={() => {
                        setYear(prev => prev - 1);setDirectionY(1);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 stroke-neutral-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </motion.button>
                </div>

            </div>
        </div>
        <div className="flex flex-row h-[13%] w-full  items-center justify-center px-2">
            <div className="flex justify-center items-center w-[10%] h-[60%]">
                <motion.button whileTap={{scale:0.8}} className="flex justify-center items-center bg-neutral-800 w-[80%] h-[80%] md:rounded-xl sm:rounded-lg  shadow" onClick={()=>prevMonth()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="md:w-5 md:h-5 sm:w-3 sm:h-3 stroke-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                </motion.button>
            </div>
            <div className="w-[40%] relative h-[60%] ">
                <div className="flex justify-center w-full items-center " >

                    <AnimatePresence initial={false} custom={direction}>

                    <motion.div key={month} variants={monthVariants} animate='animate' initial='initial' exit='exit' transition={{duration:0.3}} custom={direction} className=" absolute md:top-1 sm:top-0 h-full text-white  md:text-2xl sm:text-lg font-bold ">{monthNames[month]}</motion.div>
                    </AnimatePresence>
                </div>
                <div className="sm:opacity-0 md:opacity-100 top-0 w-full absolute h-full bg-yellow-500 bg-gradient-to-r from-[#333] via-white via-white via-white via-white via-white to-[#333]  mix-blend-darken">

                </div>
            </div>



            <div className="flex justify-center items-center w-[10%] h-[60%]">
                <motion.button whileTap={{scale:0.8}} className="flex justify-center items-center bg-neutral-800 w-[80%] h-[80%] md:rounded-xl sm:rounded-lg shadow" onClick={()=>nextMonth()}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="md:w-5 md:h-5 sm:w-3 sm:h-3 stroke-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </motion.button>
            </div>

        </div>
        <div className="h-[74%] w-full ">
            <div className="grid grid-cols-7 h-[13%] md:gap-2 sm:gap-1 p-3 sm:p-2">
                { weeks.map((week,index)=><Week day={index}>{index!=6?weeks[index+1].substring(0,3):weeks[0].substring(0,3)}</Week>)}
            </div>
          <div className="grid grid-cols-7 grid-rows-6 h-[87%] md:gap-4 sm:gap-2 p-3">
              {days.map((day)=><motion.div whileHover={{scale:[1,1.1],transition:{duration:0.3}}} animate={control} transition={{duration : 0.5}} className={(new Date().toLocaleDateString() == day.date)?"flex bg-amber-600  md:rounded-xl justify-center items-center text-white font-medium md:text-lg sm:text-[12px] shadow-xl sm:rounded-lg":(day.isThisMonth)?"flex bg-[#333] to-pink-600 border-[0.5px] border-[#555] md:rounded-xl justify-center items-center text-white font-medim md:text-lg sm:text-[12px] sm:rounded-lg":"flex md:rounded sm:rounded-lg justify-center items-center text-neutral-600 font-medium md:text-lg sm:text-[12px] "}>{day.dayKey}</motion.div>)}

          </div>
        </div>
      </div>
        <div className='fixed w-[150px] h-[100px] scale-75  top-[86%] left-1/2 translate-x-[-50%]'>
            <div className="flex w-full h-full flex-col justify-center items-center">
                <div><p className='text-md text-zinc-400 text-center font-thin'>developed by</p></div>
                <div  >
                    <svg className='w-[150px] h-[80px] mt-[-10%] flex justify-center items-center fill-zinc-400 '>
                        <g>
                            <path className="st0" d="M29.2,48.9c-5.4,0-7.1-2.7-7.5-3.5c-0.1-0.1,0-0.3,0.1-0.4l1.1-0.9c0.1-0.1,0.3-0.1,0.4,0.1
		c0.5,0.8,2.5,3,7.8,2.4c5.2-0.6,6-6.8,6-9.6c0-0.2-0.2-0.3-0.3-0.3l-9,0.9c-0.2,0-0.4-0.2-0.3-0.4l0.5-1.5c0-0.1,0.1-0.2,0.2-0.2
		l10.6-1c0.2,0,0.3,0.1,0.3,0.3l0.1,0.8c0.3,4.2-0.9,12.4-7.9,13.2C30.6,48.9,29.9,48.9,29.2,48.9z"/>
                            <path className="st0" d="M40.7,49L39.9,49c-0.3,0-0.6-0.3-0.5-0.6c0.5-2.8,2.3-12.7,5-15c1.1-1,2.5-1.1,3.7-0.4
		c1.8,1.1,3.5,4.4,1.4,14.4c-0.1,0.3-0.3,0.6-0.7,0.6l-1.1,0.2c-0.2,0-0.4-0.2-0.4-0.4c2.1-10.2,0.1-12.7-0.3-13
		c-0.5-0.3-1-0.1-1.3,0.2c-1.7,1.5-3.5,8.7-4.3,13.3C41.4,48.7,41.1,48.9,40.7,49z"/>
                            <polygon className="st0" points="41.7,43.8 42,41.1 49.1,39.8 49,42.6 	"/>
                            <path className="st0" d="M53.7,47.9l-1.4,0.2c-0.2,0-0.4-0.2-0.4-0.4l2.8-14.7c0-0.2,0.2-0.3,0.3-0.3l1.4-0.1c0.2,0,0.4,0.2,0.4,0.4
		L54,47.6C53.9,47.8,53.8,47.9,53.7,47.9z"/>
                            <path className="st0" d="M64.9,18.7l-4,28c0,0.3-0.2,0.5-0.5,0.5l-1,0.1c-0.4,0-0.7-0.3-0.6-0.7l4.6-27.9c0-0.2,0.2-0.4,0.4-0.5
		l0.5-0.1C64.6,18,65,18.3,64.9,18.7z"/>
                            <rect x="53.8" y="39" transform="matrix(0.9752 -0.2215 0.2215 0.9752 -7.4301 13.7295)"
                                  className="st0" width="7.5" height="2.1"/>
                            <path className="st0" d="M69.5,47.6c-0.2,0-0.4,0-0.6,0c-1.7-0.2-3.1-1-4-2.2c-1.1-1.4-1.6-3.5-1.3-5.5c0.5-3.1,2.7-6,6.8-5.7l0,0
		c3.5,0.3,5.3,3.4,5.3,6.4c0,1.6-0.9,4.1-2.6,5.6C72.1,47.1,70.8,47.6,69.5,47.6z M69.7,36.2c-2.6,0-3.8,2.1-4.1,3.9
		c-0.2,1.5,0.1,2.9,0.8,3.9c0.6,0.8,1.5,1.3,2.6,1.4c1,0.1,1.8-0.2,2.6-0.8c1.3-1.2,1.9-3.1,1.9-4.1c0-1.9-1.1-4.1-3.4-4.3l0,0
		C70,36.2,69.9,36.2,69.7,36.2z"/>
                            <path className="st0" d="M72.2,70.7c0,0-0.1,0.4-0.7,0.4c-0.4,0-0.4-0.6-0.4-0.6l7.5-38.2l6.2,8.9l6.2-28c0,0,0.2-0.2,0.6-0.2
		c0.3,0.1,0.4,0.4,0.4,0.4L86.4,47l-6.6-8.4L72.2,70.7z"/>
                            <path className="st0" d="M100.4,39.7c-0.2,3.1,0.6,3.7,0,5c-0.4,1.1-2,1.9-3.9,2c-0.3,0-0.5,0-0.8,0c-1.8,0-3.4-0.6-4.5-1.6
		s-1.7-2.5-1.6-4.3c0.2-5.1,2.6-8.3,6.7-8.9c3-0.4,5.2,1.4,5.3,3.5l-1.5,0c-0.4,0-0.7-0.2-0.9-0.5c-0.3-0.5-1.1-1.2-2.6-1
		c-4.1,0.6-4.8,4.6-4.8,6.9c0,3.3,3,3.8,4.6,3.7c2.6-0.2,2-3.1,1.8-4.8L100.4,39.7z"/>
                            <path className="st0" d="M96.5,40l-0.4-1.5c0-0.1,0.1-0.3,0.2-0.3l5.2,0c0.2,0,0.4,0.2,0.3,0.4l-0.2,1.4c0,0.2-0.2,0.3-0.4,0.3l-4.3,0
		C96.7,40.3,96.5,40.2,96.5,40z"/>
                            <path className="st0" d="M104.1,45.8h-1.4c-0.2,0-0.4-0.2-0.3-0.4l1.4-12.7c0-0.3,0.3-0.6,0.6-0.6l1-0.1c0.4,0,0.8,0.3,0.7,0.7
		l-1.6,12.9C104.4,45.7,104.3,45.8,104.1,45.8z"/>
                            <path className="st0"
                                  d="M109.2,45.8l-1,0c-0.3,0-0.5-0.2-0.5-0.5l1.3-13.2l2.1,0.2l-1.2,12.9C109.8,45.5,109.5,45.8,109.2,45.8z"/>
                            <path className="st0" d="M109.6,39.5c-0.2,0-0.3,0-0.5,0v-1.1c4,0.1,5.9-0.7,6.6-1.9c0.5-1,0-2.2-0.8-2.7c-2.2-1.4-4.8,0.2-4.9,0.3
		l-1-1.9c1.4-1.2,4.4-2.4,7.1-0.2c1.7,1.4,1.9,3.9,1.2,5.4C116.7,38.2,115.4,40,109.6,39.5z"/>
                            <path className="st0"
                                  d="M130.4,44.4c-10.4-0.2-20.7-4-21-4.2l0.9-1.9c0.1,0,10.8,5.4,21,5.4l0,0C131.1,44.1,130.8,44.4,130.4,44.4z"/>
                            <ellipse className="st0" cx="136.8" cy="44.4" rx="1.5" ry="1.1"/>
                        </g>
                    </svg>
                </div>
            </div>

        </div>
    </div>
  );
}
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 60
};
export default App;
