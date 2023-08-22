import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getClassName = (btn) => {
    const className = {
        '=' : 'equals',
        '+' : 'operation',
        '-' : 'operation',
        'x' : 'operation',
        '/' : 'operation',
    } 
    return className[btn];
}

const Button = ({value}) => {

    const {calc, setCalc} = useContext(CalcContext);

    // User clicks comma
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        });
    }

    // User clicks C
    const resetClick = () => {
        setCalc({sign: '', num: 0, res: 0});
    }

    // User clicks number

    const handleClickButton = () => {
        const numberString = value.toString();
        let numberValue;
        if(numberString === '0' && calc.num === 0) {
            numberValue = 0;
        } else {
            numberValue = Number(calc.num + numberString);
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }

    // User clicks operation sign
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        });
        
    }

    const equalsClick = () => {
        if (calc.res && calc.num) {
            const math = (a, b, sign) => {
                const result = {
                    '+' : (a, b) => a + b,
                    '-' : (a, b) => a - b,
                    'x' : (a, b) => a * b,
                    '/' : (a, b) => a / b,
                }
                return result[sign](a, b);
            }

            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            });
        }
    }

    // User clicks percent
    const percentClick = () => {
        setCalc({
            num: (calc.num / 100),
            res: (calc.res / 100),
            sign: ''
        })
    }
    
    // User clicks invert button
    const invertSign = () => {
        setCalc({
            num: calc.num ? calc.num * -1 : 0,
            res: calc.res ? calc.res * -1 : 0,
            sign: ''
        })
    }

    const handleBtnClick = () => {
        const results = {
            '.' : commaClick,
            'C' : resetClick,
            '+' : signClick,
            '-' : signClick,
            'x' : signClick,
            '/' : signClick,
            '=' : equalsClick,
            '%' : percentClick,
            '+-' : invertSign
        }
        if(results[value]) {
            return results[value]();
        } else {
            return handleClickButton();
        }
    }

    return (
        <button onClick={handleBtnClick} className={`${getClassName(value)} button`}>{value}</button>
    );
};

export default Button;