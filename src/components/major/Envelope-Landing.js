import React from 'react';
import IsManagerRich from "../minor/IsManagerRich";

const EnvelopeLanding = ({isManagerRich, handleAdditionalFieldsChange, additionalFields, handleIsManagerRichChange, darkMode}) => {
    return (
        <div className="main-top">
            <div className="main-top__container">
                {isManagerRich && <div className="wrapper">
                    <h1 className="title">Конверт</h1>
                    <input
                        type="number"
                        name="money"
                        onChange={handleAdditionalFieldsChange}
                        value={additionalFields.money}
                        className="tips-input"
                    />
                </div>}
                <div className="wrapper">
                    <h1 className="title">Посадка</h1>
                    <input
                        type="number"
                        name="tables"
                        onChange={handleAdditionalFieldsChange}
                        value={additionalFields.tables}
                        className="tips-input"
                    />
                </div>
            </div>
            <IsManagerRich
                isManagerRich={isManagerRich}
                handleIsManagerRichChange={handleIsManagerRichChange}
                darkMode={darkMode}
            />
        </div>
    );
};

export default EnvelopeLanding;