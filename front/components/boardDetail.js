import {Row, Space, Table} from "antd";
const { Column, ColumnGroup } = Table;
import {useState} from "react"
import TextArea from "antd/es/input/TextArea";

export default function detailContent(){
    const [content, setContent] = useState([
        {
            key: 1,
            title: "test",
            writer: "writer",
            createdAt: "createdAt",
            text: "text"
        }
    ]);

    return(
        <>
            <Table dataSource={content} pagination={{ hideOnSinglePage: true}}>
                <ColumnGroup title="Community">
                    <Column title="title" dataIndex="title" key="title" />
                    <Column title="writer" dataIndex="writer" key="writer" />
                    <Column title="createdAt" dataIndex="createdAt" key="createdAt" />
                </ColumnGroup>
            </Table>
                <div style={
                    {
                        textAlign: "center",
                        fontSize: "30px"
                    }
                }>
                    {content[0].text}
                </div>
        </>
    )
}