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
    const [firstIter , setFirstIter] = useState(true);             //it's first  iteration 
    const [fixedDablClick , setDablClikc] = useState(new Date());

    const arrayIcons = useMemo(()=>{ 
        let res = [];
        for (let el in fas) { 
            res.push(fas[el]);
        }
        return res
    } , [])

    const lengthIcons = useMemo(()=>arrayIcons.length , []);

    useEffect(()=>{ 
        setDablClikc(new Date());
    }, [icon])

    useEffect(()=>{ 
        if (clickCount === 1) setDablClikc(new Date());
    }, [clickCount])

    useEffect(() => {
        let interval;
        if (clickCount > 0) {
            setTimeout(() => {
                setChanging(()=>true);    
            }, 500);
            if ( !firstIter ) { 
                interval = setInterval(() => {
                    const newIcon = arrayIcons[Math.round(Math.random()*lengthIcons)]
                    setIcon(()=>({
                        ...newIcon
                    }))
                    setFirstIter(false);
                    setChanging(()=>false);    
                    setClickCount(prevCount => prevCount - 1);
                  }, 3000 );
            } else { 
                interval = setInterval(() => {
                    const newIcon = arrayIcons[Math.round(Math.random()*lengthIcons)]
                    setIcon(()=>({
                        ...newIcon
                    }))
                    setFirstIter(false);
                    setChanging(()=>false);    
                    setClickCount(prevCount => prevCount - 1);
                  }, 3000 - (new Date() - fixedDablClick > 3000 ? 0 : new Date() - fixedDablClick));
            }
        }  
        return () =>{ 
            setFirstIter(true);
            clearInterval(interval);
        } 
      }, [clickCount]);
    
      const changeIcon = () => {
        setClickCount(prevCount => prevCount + 1);
      };

 
    return (
        <div className={styled.box}>
            <button type="text" className={styled.box__btn} onClick={changeIcon}>Change Icon</button>
            {
                changing === undefined  ? 
                <h1>Click button</h1> :  
                changing ? 
                <h1>Loading...</h1>   : 
                <FontAwesomeIcon icon={icon} size='4x' className={styled.box__icon}/> 
            }

        </div>
    );
};

export default IconComponent;

