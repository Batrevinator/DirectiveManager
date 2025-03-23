import ButtonMobilityCard from '../ProjectCards/MovableCard';
import {React, Component} from 'react';
import HorizontalScrollContainer from './HorizontalScrollContainer';
import { BaseUrl } from '../utils/constants';
import { Modal, Input, Form, Button, CardHeader, Card, CardBody, Label, Col, Row } from 'reactstrap';
import { IoMdClose } from "react-icons/io";

class DirectiveBuilderModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name : '',
          description: '',
          priority: '',
        };
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }
    handlePriorityChange = (event) => {
        this.setState({priority: event.target.value});
    }

    submit = (event) => {
        event.preventDefault();
        const { name, description, priority } = this.state;
        this.props.addCard(priority, name, description);
        this.props.toggle();
    }

    render(){
    return (
        <div>
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col xs = {{size: 6, offset: 3}} style={{textAlign: 'center'}}>
                                Add a Card
                            </Col>
                            <Col xs = {{size: 2}} style={{textAlign: 'right'}}>
                                <Button color='danger' onClick={this.props.toggle}><IoMdClose/></Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={this.props.handleSubmit}>
                            <Col>
                                <Row>
                                    <Label for="directiveName">Directive Name:</Label>
                                    <Input type="text" name="directiveName" placeholder="Directive Name" onChange={this.handleNameChange} />
                                </Row>
                                <Row>
                                    <Label for="directiveDescription">Description:</Label>
                                    <Input type="textarea" name="directiveDescription" placeholder="Directive Description" onChange={this.handleDescriptionChange} />
                                </Row>
                                <Row>
                                    <Label for="directivePriority">Priority:</Label>
                                    <Input type="text" name="directivePriority" placeholder="Directive Priority" onChange={this.handlePriorityChange} />
                                </Row>
                                <Row style={{marginTop: '10px'}}>
                                    <Button color='primary' onClick={this.submit}>Submit</Button>
                                </Row>
                            </Col>
                        </Form>
                    </CardBody>
                </Card>
            </Modal>
        </div>
        )
    }
}

export default DirectiveBuilderModal;