import React, { useState } from "react";
import { Modal, Table, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ReactAudioPlayer from "react-audio-player";
import LogoIcon from "./logo.png";
const FixedHeaderTable = (props) => {
    const { items } = props;
    const [openItem, setOpenItem] = useState(null);
    const columns = [
        {
            title: "Index",
            dataIndex: "index",
            key: "index",
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
    ];

    return (
        <div className="p-2">
            <Table
                columns={columns}
                dataSource={items}
                onRow={(record) => ({
                    onClick: () => {
                        setOpenItem(record);
                    },
                })}
            />
            {!!openItem && (
                <Modal
                    open={!!openItem}
                    onCancel={() => {
                        setOpenItem(null);
                    }}
                    className="fixed top-0 left-0 right-0 bottom-0"
                    header={null}
                    footer={null}
                >
                    <div className="w-full h-full flex flex-col">
                        <div className="flex flex-col items-center p-1">
                            <img className="w-[36px] h-[36px]" src={LogoIcon}/>
                            <div className="text-sm font-bold">
                                Shadowing English App
                            </div>
                        </div>
                        <div className="font-bold mb-2 flex items-center pr-2">
                            <ArrowLeftOutlined
                                onClick={() => {
                                    setOpenItem(null);
                                }}
                                className="text-xl cursor-pointer hover:text-gray-400"
                            />
                            <div className="px-2">
                                <Tag color="magenta">{openItem?.index}</Tag>
                            </div>
                            <div className="flex-1 text-xl">
                                {openItem?.title ?? ""}
                            </div>
                        </div>
                        <div className="flex-1 text-md p-1 overflow-y-auto">
                            {openItem?.content.split("\n").map((item) => {
                                return <p className="mb-3 leading-7">{item}</p>;
                            })}
                        </div>
                        <div className="flex justify-center mt-2">
                            <ReactAudioPlayer
                                src={openItem?.audioUrl}
                                autoPlay
                                controls
                            />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FixedHeaderTable;
