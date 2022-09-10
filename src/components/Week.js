import React from 'react';

function Week({children,...props}) {
    return (
        <div className={(props.day>=5)?"flex bg-neutral-900 rounded justify-center items-center text-neutral-400 sm:text-[10px] md:text-[14px]":(props.day==4)?"flex bg-amber-800 border-[1px] border-amber-600 rounded justify-center items-center text-neutral-200 sm:text-[10px] md:text-[14px]":"flex bg-neutral-700 rounded justify-center items-center text-neutral-400 sm:text-[10px] md:text-[14px]"}>{children}</div>
    );
}

export default Week;