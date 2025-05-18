import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

interface AddTextProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const AddText: React.FC<AddTextProps> = ({
    value,
    onChange,
    placeholder = "Enter your text here...",
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-gray-700">Text</label>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-24 p-2 border border-gray-300 rounded"
                style={{ resize: "none" }}
            />
            <div className="flex items-center gap-2">
                <label className="text-gray-700">Font Size</label>
                <input
                    type="number"
                    min="8"
                    max="72"
                    defaultValue="16"
                    className="w-16 p-1 border border-gray-300 rounded"
                    onChange={(e) => {
                        const fontSize = e.target.value;
                        if (textareaRef.current) {
                            textareaRef.current.style.fontSize = `${fontSize}px`;
                        }
                    }
                    }
                />
                <label className="text-gray-700">Font Color</label>
                <input
                    type="color"
                    defaultValue="#000000"
                    className="w-16 h-10 p-1 border border-gray-300 rounded"
                    onChange={(e) => {
                        const color = e.target.value;
                        if (textareaRef.current) {
                            textareaRef.current.style.color = color;
                        }
                    }
                    }
                />
            </div>
            <div className="flex items-center gap-2">
                <label className="text-gray-700">Font Family</label>
                <select
                    className="w-full p-1 border border-gray-300 rounded"
                    onChange={(e) => {
                        const fontFamily = e.target.value;
                        if (textareaRef.current) {
                            textareaRef.current.style.fontFamily = fontFamily;
                        }
                    }
                    }
                >
                    <option value="Arial">Arial</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Impact">Impact</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Lucida Console">Lucida Console</option>
                    <option value="Palatino Linotype">Palatino Linotype</option>
                    <option value="Bookman">Bookman</option>
                    <option value="Arial Black">Arial Black</option>
                    <option value="Arial Narrow">Arial Narrow</option>
                    <option value="Arial Unicode MS">Arial Unicode MS</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Cambria">Cambria</option>
                    <option value="Candara">Candara</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Consolas">Consolas</option>
                    <option value="Constantia">Constantia</option>
                    <option value="Corbel">Corbel</option>
                    <option value="Courier">Courier</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Garamond">Garamond</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Lucida Bright">Lucida Bright</option>
                    <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                    <option value="Microsoft Sans Serif">Microsoft Sans Serif</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Webdings">Webdings</option>
                    <option value="Wingdings">Wingdings</option>
                    <option value="Symbol">Symbol</option>
                    <option value="Arial Black">Arial Black</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Impact">Impact</option>          
                    <option value="Lucida Console">Lucida Console</option>  
                    <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                    <option value="Palatino Linotype">Palatino Linotype</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Webdings">Webdings</option>
                    <option value="Wingdings">Wingdings</option>
                    <option value="Symbol">Symbol</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label className="text-gray-700">Text Alignment</label>
                <select
                    className="w-full p-1 border border-gray-300 rounded"
                    onChange={(e) => {
                        const textAlign = e.target.value;
                        if (textareaRef.current) {
                            textareaRef.current.style.textAlign = textAlign;
                        }
                    }
                    }
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label className="text-gray-700">Text Decoration</label>
                <select
                    className="w-full p-1 border border-gray-300 rounded"
                    onChange={(e) => {
                        const textDecoration = e.target.value;
                        if (textareaRef.current) {
                            textareaRef.current.style.textDecoration = textDecoration;
                        }
                    }
                    }
                >
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="overline">Overline</option>
                    <option value="line-through">Line-through</option>
                    <option value="blink">Blink</option>
                    <option value="italic">Italic</option>
                    <option value="bold">Bold</option>
                    <option value="oblique">Oblique</option>
                    <option value="small-caps">Small Caps</option>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="capitalize">Capitalize</option>
                    <option value="normal">Normal</option>
                    <option value="inherit">Inherit</option>
                    <option value="initial">Initial</option>
                    <option value="unset">Unset</option>
                    <option value="revert">Revert</option>
                    <option value="revert-layer">Revert Layer</option>
                    <option value="all">All</option>
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="overline">Overline</option>
                    <option value="line-through">Line-through</option>
                    <option value="blink">Blink</option>
                    <option value="italic">Italic</option>
                    <option value="bold">Bold</option>
                    <option value="oblique">Oblique</option>
                    <option value="small-caps">Small Caps</option>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="capitalize">Capitalize</option>
                    <option value="normal">Normal</option>
                    <option value="inherit">Inherit</option>
                    <option value="initial">Initial</option>
                    <option value="unset">Unset</option>
                    <option value="revert">Revert</option>
                    <option value="revert-layer">Revert Layer</option>
                    <option value="all">All</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label className="text-gray-700">Text Shadow</label>
                <select
                    className="w-full p-1 border border-gray-300 rounded"
                    onChange={(e) => {
                        const textShadow = e.target.value;
                        if (textareaRef.current) {
                            textareaRef.current.style.textShadow = textShadow;
                        }
                    }
                    }
                >
                    <option value="none">None</option>
                    <option value="2px 2px 2px #000000">2px 2px 2px #000000</option>
                    <option value="4px 4px 4px #000000">4px 4px 4px #000000</option>
                    <option value="6px 6px 6px #000000">6px 6px 6px #000000</option>
                    <option value="8px 8px 8px #000000">8px 8px 8px #000000</option>
                    <option value="10px 10px 10px #000000">10px 10px 10px #000000</option>
                    <option value="12px 12px 12px #000000">12px 12px 12px #000000</option>
                    <option value="14px 14px 14px #000000">14px 14px 14px #000000</option>
                    <option value="16px 16px 16px #000000">16px 16px 16px #000000</option>
                    <option value="18px 18px 18px #000000">18px 18px 18px #000000</option>
                    <option value="20px 20px 20px #000000">20px 20px 20px #000000</option>
                    <option value="22px 22px 22px #000000">22px 22px 22px #000000</option>
                    <option value="24px 24px 24px #000000">24px 24px 24px #000000</option>
                    <option value="26px 26px 26px #000000">26px 26px 26px #000000</option>
                    <option value="28px 28px 28px #000000">28px 28px 28px #000000</option>
                    <option value="30px 30px 30px #000000">30px 30px 30px #000000</option>
                    <option value="32px 32px 32px #000000">32px 32px 32px #000000</option>
                    <option value="34px 34px 34px #000000">34px 34px 34px #000000</option>
                    <option value="36px 36px 36px #000000">36px 36px 36px #000000</option>
                    <option value="38px 38px 38px #000000">38px 38px 38px #000000</option>
                    <option value="40px 40px 40px #000000">40px 40px 40px #000000</option>
                    <option value="42px 42px 42px #000000">42px 42px 42px #000000</option>
                    <option value="44px 44px 44px #000000">44px 44px 44px #000000</option>
                    <option value="46px 46px 46px #000000">46px 46px 46px #000000</option>
                    <option value="48px 48px 48px #000000">48px 48px 48px #000000</option>
                    <option value="50px 50px 50px #000000">50px 50px 50px #000000</option>
                    <option value="52px 52px 52px #000000">52px 52px 52px #000000</option>
                    <option value="54px 54px 54px #000000">54px 54px 54px #000000</option>
                    <option value="56px 56px 56px #000000">56px 56px 56px #000000</option>
                    <option value="58px 58px 58px #000000">58px 58px 58px #000000</option>
                    <option value="60px 60px 60px #000000">60px 60px 60px #000000</option>
                    <option value="62px 62px 62px #000000">62px 62px 62px #000000</option>
                    <option value="64px 64px 64px #000000">64px 64px 64px #000000</option>
                    <option value="66px 66px 66px #000000">66px 66px 66px #000000</option>
                    <option value="68px 68px 68px #000000">68px 68px 68px #000000</option>
                    <option value="70px 70px 70px #000000">70px 70px 70px #000000</option>
                    <option value="72px 72px 72px #000000">72px 72px 72px #000000</option>
                    <option value="74px 74px 74px #000000">74px 74px 74px #000000</option>
                    <option value="76px 76px 76px #000000">76px 76px 76px #000000</option>
                    <option value="78px 78px 78px #000000">78px 78px 78px #000000</option>
                    <option value="80px 80px 80px #000000">80px 80px 80px #000000</option>
                    <option value="82px 82px 82px #000000">82px 82px 82px #000000</option>
                    <option value="84px 84px 84px #000000">84px 84px 84px #000000</option>
                    <option value="86px 86px 86px #000000">86px 86px 86px #000000</option>
                    <option value="88px 88px 88px #000000">88px 88px 88px #000000</option>
                    <option value="90px 90px 90px #000000">90px 90px 90px #000000</option>
                    <option value="92px 92px 92px #000000">92px 92px 92px #000000</option>
                    <option value="94px 94px 94px #000000">94px 94px 94px #000000</option>
                    <option value="96px 96px 96px #000000">96px 96px 96px #000000</option>
                    <option value="98px 98px 98px #000000">98px 98px 98px #000000</option>
                    <option value="100px 100px 100px #000000">100px 100px 100px #000000</option>
                    <option value="102px 102px 102px #000000">102px 102px 102px #000000</option>
                    <option value="104px 104px 104px #000000">104px 104px 104px #000000</option>
                    <option value="106px 106px 106px #000000">106px 106px 106px #000000</option>
                    <option value="108px 108px 108px #000000">108px 108px 108px #000000</option>
                    <option value="110px 110px 110px #000000">110px 110px 110px #000000</option>
                    <option value="112px 112px 112px #000000">112px 112px 112px #000000</option>
                    <option value="114px 114px 114px #000000">114px 114px 114px #000000</option>
                    <option value="116px 116px 116px #000000">116px 116px 116px #000000</option>
                    <option value="118px 118px 118px #000000">118px 118px 118px #000000</option>
                    <option value="120px 120px 120px #000000">120px 120px 120px #000000</option>
                    <option value="122px 122px 122px #000000">122px 122px 122px #000000</option>
                    <option value="124px 124px 124px #000000">124px 124px 124px #000000</option>
                    <option value="126px 126px 126px #000000">126px 126px 126px #000000</option>
                    <option value="128px 128px 128px #000000">128px 128px 128px #000000</option>
                    <option value="130px 130px 130px #000000">130px 130px 130px #000000</option>
                    <option value="132px 132px 132px #000000">132px 132px 132px #000000</option>
                    <option value="134px 134px 134px #000000">134px 134px 134px #000000</option>
                    <option value="136px 136px 136px #000000">136px 136px 136px #000000</option>
                    <option value="138px 138px 138px #000000">138px 138px 138px #000000</option>
                    <option value="140px 140px 140px #000000">140px 140px 140px #000000</option>

                    <option value="142px 142px 142px #000000">142px 142px 142px #000000</option>
                    <option value="144px 144px 144px #000000">144px 144px 144px #000000</option>
                    <option value="146px 146px 146px #000000">146px 146px 146px #000000</option>
                    <option value="148px 148px 148px #000000">148px 148px 148px #000000</option>
                    <option value="150px 150px 150px #000000">150px 150px 150px #000000</option>
                    <option value="152px 152px 152px #000000">152px 152px 152px #000000</option>
                    <option value="154px 154px 154px #000000">154px 154px 154px #000000</option>
                    <option value="156px 156px 156px #000000">156px 156px 156px #000000</option>
                    <option value="158px 158px 158px #000000">158px 158px 158px #000000</option>
                    <option value="160px 160px 160px #000000">160px 160px 160px #000000</option>
                    <option value="162px 162px 162px #000000">162px 162px 162px #000000</option>
                    <option value="164px 164px 164px #000000">164px 164px 164px #000000</option>
                    <option value="166px 166px 166px #000000">166px 166px 166px #000000</option>
                    <option value="168px 168px 168px #000000">168px 168px 168px #000000</option>
                    <option value="170px 170px 170px #000000">170px 170px 170px #000000</option>
                    <option value="172px 172px 172px #000000">172px 172px 172px #000000</option>
                    <option value="174px 174px 174px #000000">174px 174px 174px #000000</option>
                    <option value="176px 176px 176px #000000">176px 176px 176px #000000</option>
                    <option value="178px 178px 178px #000000">178px 178px 178px #000000</option>
                    <option value="180px 180px 180px #000000">180px 180px 180px #000000</option>
                    <option value="182px 182px 182px #000000">182px 182px 182px #000000</option>
                     <option value="184px 184px 184px #000000">184px 184px 184px #000000</option>
                    <option value="186px 186px 186px #000000">186px 186px 186px #000000</option>
                    <option value="188px 188px 188px #000000">188px 188px 188px #000000</option>
                    <option value="190px 190px 190px #000000">190px 190px 190px #000000</option>
                    <option value="192px 192px 192px #000000">192px 192px 192px #000000</option>
                    <option value="194px 194px 194px #000000">194px 194px 194px #000000</option>
                    <option value="196px 196px 196px #000000">196px 196px 196px #000000</option>
                    <option value="198px 198px 198px #000000">198px 198px 198px #000000</option>
                    <option value="200px 200px 200px #000000">200px 200px 200px #000000</option>
                </select>
            </div>
            <Button onClick={() => {
                if (textareaRef.current) {
                    const text = textareaRef.current.value;
                    // Add logic to add text to the canvas
                    console.log("Text added to canvas:", text);
                }
            }} className="mt-2">
                Add Text
            </Button>
        </div>
                   
    );
};

export default AddText;