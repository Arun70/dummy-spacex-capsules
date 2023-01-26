import React, {useEffect} from 'react';
import {Card, Col, Row, ListGroup, Pagination, 
    Stack, Popover, OverlayTrigger, Table} from 'react-bootstrap'
import './capsule.scss';

interface propCaps {
    capsData: Array<capObj>,
    rowsPerPage: number
}

interface capObj {
    capsule_id: String;
    capsule_serial: String;
    details: String,
    landings: number,
    original_launch: string;
    reuse_count: number;
    status: String,
    original_launch_unix: number,
    type: string,
    missions: Array<missObj>
}

interface missObj {
    flight: number,
    name: string
}

export default function Capsules(props: propCaps) {
    const { capsData, rowsPerPage } = props;
    const rows = capsData.length;
    const lastPage = Math.ceil(rows / rowsPerPage);
    const [dataPerPage, setDataPerPage] = React.useState<any[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    useEffect(() => {

        let tempArray = []
        if(capsData && capsData.length > 0) {
            for (let i = 0; i < capsData.length; i += rowsPerPage) {
                const chunk = capsData.slice(i, i + rowsPerPage);
                // do 
                tempArray.push(chunk)
            }
        }
        setCurrentPage(1)
        setDataPerPage(tempArray)
    }, [capsData]);

    const monDtFormat = (dt: string, showTime: boolean = false) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const exDt = new Date(dt)
        var month = months[exDt.getMonth()]
        var date = exDt.getDate()
        var yr =  exDt.getFullYear()

        if(showTime) {
            return exDt.toDateString() + " " + exDt.toLocaleTimeString()
        }
        return month + " " + date + ", " + yr
    }

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    const popover = (cardCapsObj: capObj) => {
        return (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Capsule details: </Popover.Header>
          <Popover.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Capsule Id: {cardCapsObj.capsule_id}</ListGroup.Item>
                <ListGroup.Item>Capsule Serial: {cardCapsObj.capsule_serial}</ListGroup.Item>
                <ListGroup.Item>Details: {cardCapsObj.details}</ListGroup.Item>
                <ListGroup.Item>Landings: {cardCapsObj.landings}</ListGroup.Item>
                <ListGroup.Item>Original Launch: {monDtFormat(cardCapsObj.original_launch, true)}</ListGroup.Item>
                <ListGroup.Item>Reuse Count: {cardCapsObj.reuse_count}</ListGroup.Item>
                <ListGroup.Item>Status: {cardCapsObj.status}</ListGroup.Item>
                <ListGroup.Item>Type: {cardCapsObj.type}</ListGroup.Item>
            </ListGroup>
            <div className='miss-tab-cont'>
                <h5>Missions</h5>
                <Table responsive striped bordered variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Flight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cardCapsObj.missions && cardCapsObj.missions.length && cardCapsObj.missions.map((missObj, index) => (
                            <tr>
                                <td key={index}>{missObj.name}</td>
                                <td key={index}>{missObj.flight}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
          </Popover.Body>
        </Popover>
    )};

    return (
        <Stack gap={3} className="align-items-center capsls-cont">
            <Row xs={1} md={2} className="g-4">
                {dataPerPage && dataPerPage[currentPage-1] && dataPerPage[currentPage-1].length && dataPerPage[currentPage-1].map((capsObj: capObj, idx: number) => (
                    <Col>
                        <OverlayTrigger trigger="click" placement="right" overlay={popover(capsObj)}>
                            <Card style={{ width: '18rem' }} bg={'dark'} text={'light'}>
                                <Card.Header>{capsObj.capsule_id}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{capsObj.capsule_serial}</Card.Title>
                                    <Card.Text>{capsObj.details}</Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Status: {capsObj.status}</ListGroup.Item>
                                    <ListGroup.Item>Type: {capsObj.type}</ListGroup.Item>
                                    <ListGroup.Item>Landing: {capsObj.landings}</ListGroup.Item>
                                    <ListGroup.Item>Original Launch: {monDtFormat(capsObj.original_launch)}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </OverlayTrigger>
                    </Col>
                ))}
            </Row>
            <Pagination>
                {currentPage > 1 ? <Pagination.First onClick={() => handleClick(1)}/> : null}
                {currentPage > 1 ? <Pagination.Prev onClick={() => handleClick(currentPage-1)}/> : null}
                {currentPage-1 ? <Pagination.Item
                    onClick={() => handleClick(currentPage-1)}
                    >
                        {currentPage-1}
                </Pagination.Item> : null}
                <Pagination.Item
                    active={true}
                    onClick={() => handleClick(2)}
                    >
                        {currentPage}
                </Pagination.Item>
                {currentPage+1<=lastPage ? <Pagination.Item 
                    onClick={() => handleClick(currentPage+1)}
                    >
                        {currentPage+1}
                </Pagination.Item> : null}
                {currentPage<lastPage ? <Pagination.Next onClick={() => handleClick(currentPage+1)}/> : null}
                {currentPage<lastPage ? <Pagination.Last onClick={() => handleClick(lastPage)}/> : null}
            </Pagination>
        </Stack>
    );
}
