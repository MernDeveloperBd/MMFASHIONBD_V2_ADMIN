

const ProgressBar = (props) => {
    return (
        <div className="w-[90px] h-[auto] overflow-hidden rounded-sm bg-[#f1f1f1]">
            <span className={`flex items-center w-[${props.value}%] h-[8px] bg-blue-500 ${props.type === "success" &&'bg-green-600'} ${props.type === "error" &&'bg-red-600'} ${props.type === "warning" &&'bg-orange-500'}`}>
                {props.value}
            </span>
            
        </div>
    );
};

export default ProgressBar;