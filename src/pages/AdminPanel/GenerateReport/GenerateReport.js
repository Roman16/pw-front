import React, {useState} from "react";
import {Input} from "antd";
import DatePicker from '../../../components/DatePicker/DatePicker';
import {adminServices} from "../../../services/admin.services";
import {notification} from "../../../components/Notification";
import moment from "moment";

const GenerateReport = () => {

    const [fieldsValue, setFieldsValue] = useState({
        email: null,
        start_date: null,
        end_date: null,
        last_report: null
    });

    const generateReportHandler = async (e) => {
        e.preventDefault();

        try {
            await adminServices.generateReport(fieldsValue);

            notification.success({title: 'Success'})
        } catch (e) {
            console.log(e);
        }
    };

    const changeInputHandler = ({target: {value, name}}) => {
        setFieldsValue({
            ...fieldsValue,
            [name]: value
        })
    };

    const changeDatepickerHandler = (name, value) => {
        setFieldsValue({
            ...fieldsValue,
            [name]: moment(value).toISOString()
        })
    };

    return (
        <section className={'generate-report-section'}>
            <h2>Report</h2>

            <div className="fields">
                <form className="form-group" onSubmit={generateReportHandler}>
                    <Input
                        type="text"
                        placeholder={`Email`}
                        name={'email'}
                        onChange={changeInputHandler}
                        required
                    />

                    <DatePicker
                        type="text"
                        placeholder={`Start date`}
                        onChange={(value) => changeDatepickerHandler('start_date', value)}
                        showToday={false}
                        format="MMM DD, YYYY"
                        required
                    />

                    <DatePicker
                        type="text"
                        placeholder={`End date`}
                        onChange={(value) => changeDatepickerHandler('end_date', value)}
                        showToday={false}
                        format="MMM DD, YYYY"
                        required
                    />

                    <Input
                        type="text"
                        placeholder={`Last report link`}
                        name={'last_report'}
                        onChange={changeInputHandler}
                        required
                    />

                    <button className={'btn default'}>Generate</button>
                </form>
            </div>

        </section>
    )
};

export default GenerateReport;