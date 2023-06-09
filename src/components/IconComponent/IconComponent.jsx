import { useEffect, useMemo , useState  } from 'react';
import styled from './IconComponent.module.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);


const IconComponent = () => {
    const [changing , setChanging] = useState(undefined);
    const [icon , setIcon] = useState({});
    const [clickCount, setClickCount] = useState(0);

    const [lastChange , setLastChange] = useState(new Date());
    const [lastClick , setLastClick] = useState(0);


    const arrayIcons = useMemo(()=>{ 
        let res = [];
        for (let el in fas) { 
            res.push(fas[el]);
        }
        return res
    } , [])

    const lengthIcons = useMemo(()=>arrayIcons.length , []);



    useEffect(() => {
    let timing;
    if (clickCount > 0) { 
        timing = setTimeout(() => {
            setChanging(()=> true);
        }, 1000 - (new Date() - lastChange));
    }
    return () =>{ 
        clearTimeout(timing);
    } 
    }, [clickCount]);


    useEffect(()=>{ 
        if (changing) { 
            setTimeout(() => {
                const newIcon = arrayIcons[Math.round(Math.random()*lengthIcons)]
                setIcon(()=>({
                    ...newIcon
                }))
        }, clickCount === 1 && (new Date() - lastClick < 3000) ? 3000 : 2000);

        }
    } , [changing])

    useEffect(()=>{ 
        if ('prefix' in icon) { 
        setLastChange(new Date());
        setChanging(()=>false); 
        setClickCount(prevCount => prevCount - 1);
        }

    }, [icon])



    const clickBtn = () => {
    setClickCount(prevCount => prevCount + 1);
    setLastClick(new Date())
    };


 
    return (
        <div className={styled.box}>
            <button type="text" className={styled.box__btn} onClick={clickBtn}>Change Icon</button>
                <h1 className={ changing === undefined ? styled.h1 : styled.h1__hidden }>Click button</h1> 
                <h1 className={ changing  ? styled.h1 : styled.h1__hidden }>Loading...</h1>   
                <FontAwesomeIcon className={ !changing  ? styled.box__icon : styled.box__icon__hidden} icon={icon} size='4x' /> 
        </div>
    );
};

export default IconComponent;

