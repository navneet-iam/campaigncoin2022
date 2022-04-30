import React, {Component} from 'react';
import {Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes'
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
// import head from 'next/head';
import  RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component{
    static async getInitialProps(props){
        const { address } = props.query;
        const campaign=  Campaign(address);
        const requestCount = await campaign.methods.getRequestCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        ;
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) =>{
                return campaign.methods.requests(index).call()
                
            })
        );

        // console.log(requests);

        return {address, requests, requestCount, approversCount};
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />;
        });
    }

    render(){
        const {Header, Row, HeaderCell, Body} =Table;
        return(
            <div style ={{backgroundImage:'url("https://www.futureswap.com/images/Graphic-Hero-Blur.jpg")',  backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height:"100vh",
      }}>
            <Layout>
                <h3 style={{color:"white"}}>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button floated='right' primary style={{marginBottom:10}}>Add request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
                <div style={{color:"white"}}>Found {this.props.requestCount} requests.</div>
            </Layout>
            </div>
        );
    }
}

export default RequestIndex;