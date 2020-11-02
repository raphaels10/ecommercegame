import React from 'react'
import './product.css'
import { Link } from 'react-router-dom'
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap'


export default params => {
    const color = params.dark ? "#333" : "#FFF"
    const outline = params.outline ? `outline-${params.outline}` : ""
    const link = `/products/${params.link}`
    const mini = params.mini ? "card-mini" : "";
    

    return (
        <>
            <Card className={`card-fixed-size ${outline} ${mini}`} style={{backgroundColor: color}}>
                <CardImg className="card-img-fixed-size" src={params.image} alt={params.alt}/>
                <CardBody className="card-body-custom">
                    <CardTitle className="card-title-custom">{params.title}</CardTitle>
                    <CardSubtitle className="card-title-custom mb-3">{params.subtitle}</CardSubtitle>
                    <Button>
                        <Link to={link}>{params.label}</Link>
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}