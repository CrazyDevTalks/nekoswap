import React, {useState, useEffect} from "react";
import { Form } from 'antd';

const DefaultCard = ({
    children,
    header = "Security Detection",
    footer = false,
    footerWrapper = "",
    onFinish = 'onFinish',
    form = ''
}) => {

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form 
            // form={form}
            name="validateOnly"
            layout="vertical"
            onFinish={onFinish}
            onReset={onReset}
            autoComplete="off">
            <div className="bg-[#1B1B1B] rounded-2xl">
                <div className="p-7 max-sm:p-4 border-b border-b-[#2C2C2C]">
                    <p className="text-[24px] text-white font-bold">
                        {header}</p>
                </div>
                <div className="p-7 max-sm:p-4">
                    {children}</div>
                {
                footer && (
                    <div className="border-t border-t-[#2C2C2C] p-7">
                        {footerWrapper} </div>
                )
            }</div>
        </Form>
    );
};

export default DefaultCard;
