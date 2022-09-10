import "./index.css"
import {useEffect, useState} from "react";
import {motion, useAnimation, AnimatePresence} from "framer-motion";
import "./style.css"
import Week from "./components/Week";
import Signature from "./components/Signature";

function App() {
    const today = new Date()
    const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [day, setDay] = useState(today.getDay())
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const [days, setDays] = useState([])
    const [direction, setDirection] = useState(0)
    const [directionY, setDirectionY] = useState(0)

    const control = useAnimation()

    const yearVariants = {
        initial: direction => {
            return {
                y: direction > 0 ? 30 : -30, opacity: 0, scale: 0.5
            }
        },
        animate: {
            y: 0, opacity: 1, scale: 1
        },
        exit: direction => {
            return {
                y: direction > 0 ? -30 : 30, opacity: 0, scale: 0.5
            }
        }
    }

    const monthVariants = {
        initial: direction => {
            return {
                x: direction > 0 ? 50 : -50, opacity: 0, scale: 0.5
            }
        },
        animate: {
            x: 0, opacity: 1, scale: 1
        },
        exit: direction => {
            return {
                x: direction > 0 ? -50 : 50, opacity: 0, scale: 0.5
            }
        }
    }

    const nextMonth = () => {
        setDirection(1)
        if (month == 11) {
            setMonth(0)
            setYear(prev => prev + 1)
            setDirectionY(-1)
        } else setMonth(prev => prev + 1)

    }

    const prevMonth = () => {
        setDirection(-1)
        if (month == 0) {
            setMonth(11)
            setYear(prev => prev - 1)
            setDirectionY(1)
        } else setMonth(prev => prev - 1)
    }

    useEffect(() => {
        setFebDays()
        setDays([])
        setDaysArray()
    }, [])

    const setFebDays = () => {
        if (new Date(year, 1, 29).getMonth() == 1) {
            months[1] = 29
        } else months[1] = 28
    }

    const setDaysArray = () => {
        const calendarDays = []
        let daysLength = 0
        let firstDayOfMonth = new Date(year, month, 1).getDay()
        let lastDays
        if (firstDayOfMonth == 0)
            lastDays = 6
        lastDays = firstDayOfMonth - 1
        let lastMonth = month == 0 ? 11 : month - 1
        let nextMonth = month == 11 ? 0 : month + 1
        let lastYear = month == 0 ? year - 1 : year
        let nextYear = month == 11 ? year + 1 : year
        for (let i = months[lastMonth] - lastDays + 1; i <= months[lastMonth]; i++) {
            calendarDays.push({
                dayKey: i,
                isThisMonth: false,
                date: new Date(lastYear, lastMonth, i).toLocaleDateString()
            })
            ++daysLength
        }
        for (let i = 1; i <= months[month]; i++) {
            calendarDays.push({dayKey: i, isThisMonth: true, date: new Date(year, month, i).toLocaleDateString()})
            ++daysLength
        }

        for (let i = 1; i < 10; i++) {
            if (daysLength % 7 == 0)
                break
            calendarDays.push({
                dayKey: i,
                isThisMonth: false,
                date: new Date(nextYear, nextMonth, i).toLocaleDateString()
            })
            ++daysLength
        }
        control.start({opacity: [0, 1]})
        setDays(calendarDays)
    }


    useEffect(() => {
        setFebDays()
        setDays([])
        setDaysArray()
    }, [month, year])

    return (
        <div className="grid bg-[#111] w-screen h-screen fixed items-center justify-center">
            <div
                className="md:w-[500px] md:h-[600px] sm:w-[300px] sm:h-[360px] bg-[#222222] rounded-2xl p-3 border-[1px] border-[#555] drop-shadow-[0_5px_55px_rgba(120,120,120,0.3)]">
                <div className="flex flex-row h-[13%] w-full md:px-5 sm:px-2">
                    <div className="flex flex-col w-[60%] h-full ">
                        <h1 className="flex items-end h-[62%]  md:text-3xl sm:text-lg font-bold text-neutral-200">{`${today.getDate()} ${monthNames[today.getMonth()].substring(0, 3)} ${today.getFullYear()}`}</h1>
                        <h1 className="flex items-top h-[38%] md:text-xl sm:text-sm text-neutral-400 font-thin">{weeks[day]}</h1>
                    </div>
                    <div className="flex flex-row justify-between w-[40%] h-hull p-1 gap-1">
                        <div className="relative md:top-1/2 md:left-[45%] sm:left-[25%] sm:top-1/4">
                            <AnimatePresence initial={false} custom={directionY}>
                                <motion.div key={year} variants={yearVariants} animate='animate' initial='initial'
                                            exit='exit' transition={{duration: 0.3}} custom={directionY}
                                            className="absolute w-30 text-neutral-400 font-bold md:text-2xl sm:text-lg">{year}</motion.div>
                            </AnimatePresence>
                        </div>
                        <div
                            className="flex flex-col justify-end items-end text-white font-bold text-2xl md:w-[15%] sm:w-[25%] h-full gap-1 px-1">
                            <motion.button whileTap={{scale: 0.8}}
                                           className="w-full bg-neutral-700 flex justify-center items-center rounded"
                                           onClick={() => {
                                               setYear(prev => prev + 1);
                                               setDirectionY(-1);

                                           }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 stroke-neutral-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                                </svg>
                            </motion.button>
                            <motion.button whileTap={{scale: 0.8}}
                                           className="w-full bg-neutral-700 flex justify-center items-center rounded"
                                           onClick={() => {
                                               setYear(prev => prev - 1);
                                               setDirectionY(1);
                                           }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 stroke-neutral-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </motion.button>
                        </div>

                    </div>
                </div>
                <div className="flex flex-row h-[13%] w-full  items-center justify-center px-2">
                    <div className="flex justify-center items-center w-[10%] h-[60%]">
                        <motion.button whileTap={{scale: 0.8}}
                                       className="flex justify-center items-center bg-neutral-800 w-[80%] h-[80%] md:rounded-xl sm:rounded-lg  shadow"
                                       onClick={() => prevMonth()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 className="md:w-5 md:h-5 sm:w-3 sm:h-3 stroke-neutral-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                            </svg>
                        </motion.button>
                    </div>
                    <div className="w-[40%] relative h-[60%] ">
                        <div className="flex justify-center w-full items-center ">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div key={month} variants={monthVariants} animate='animate' initial='initial'
                                            exit='exit' transition={{duration: 0.3}} custom={direction}
                                            className=" absolute md:top-1 sm:top-0 h-full text-white  md:text-2xl sm:text-lg font-bold ">{monthNames[month]}</motion.div>
                            </AnimatePresence>
                        </div>
                        <div
                            className="sm:opacity-0 md:opacity-100 top-0 w-full absolute h-full bg-yellow-500 bg-gradient-to-r from-[#333] via-white via-white via-white via-white via-white to-[#333]  mix-blend-darken">
                        </div>
                    </div>


                    <div className="flex justify-center items-center w-[10%] h-[60%]">
                        <motion.button whileTap={{scale: 0.8}}
                                       className="flex justify-center items-center bg-neutral-800 w-[80%] h-[80%] md:rounded-xl sm:rounded-lg shadow"
                                       onClick={() => nextMonth()}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 className="md:w-5 md:h-5 sm:w-3 sm:h-3 stroke-neutral-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                            </svg>
                        </motion.button>
                    </div>

                </div>
                <div className="h-[74%] w-full ">
                    <div className="grid grid-cols-7 h-[13%] md:gap-2 sm:gap-1 p-3 sm:p-2">
                        {weeks.map((week, index) => <Week
                            day={index}>{index != 6 ? weeks[index + 1].substring(0, 3) : weeks[0].substring(0, 3)}</Week>)}
                    </div>
                    <div className="grid grid-cols-7 grid-rows-6 h-[87%] md:gap-4 sm:gap-2 p-3">
                        {days.map((day) => <motion.div whileHover={{scale: [1, 1.1], transition: {duration: 0.3}}}
                                                       animate={control} transition={{duration: 0.5}}
                                                       className={(new Date().toLocaleDateString() == day.date) ? "flex bg-amber-600  md:rounded-xl justify-center items-center text-white font-medium md:text-lg sm:text-[12px] shadow-xl sm:rounded-lg" : (day.isThisMonth) ? "flex bg-[#333] to-pink-600 border-[0.5px] border-[#555] md:rounded-xl justify-center items-center text-white font-medim md:text-lg sm:text-[12px] sm:rounded-lg" : "flex md:rounded sm:rounded-lg justify-center items-center text-neutral-600 font-medium md:text-lg sm:text-[12px] "}>{day.dayKey}</motion.div>)}
                    </div>
                </div>
            </div>
            <Signature>developed by</Signature>
        </div>
    );
}

export default App;
