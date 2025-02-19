import React from "react";
import { Container, Card, CardBody, CardHeader, CardTitle, CardText, CardSubtitle, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPeopleArrows, faComments, faHandshake, faCalendarDay } from "@fortawesome/free-solid-svg-icons";

const nextSteps = [{
    title: "Beta Launch",
    description: "We're in the lab, fine-tuning for beta launch targeting May 1, 2025. That’s not all — stay tuned for a development roadmap that’ll outline what we’re building, from beta to the official launch.",
    icon: faCalendarDay,
},{
    title: "Spread the Word",
    description: "You’re part of Spitface Battles — help us spread the word! Share your excitement with friends and followers about the future of battle rap.",
    icon: faPeopleArrows,
},{
    title: "Join the Movement",
    description: "Spitface Battles is just getting started — bigger opportunities are on the way. We’re launching an Ambassador Program with exclusive perks. Plus, we’re exploring equity crowdfunding opportunities, so you might even own a piece of the future! Stay tuned for details.",
    icon: faHandshake,
},{
    title: "Stay Connected",
    description: 'Got questions? Reach out to us at [link-0]. Follow us on [link-1] for updates and sneak peeks. More social platforms coming soon!',
    icon: faComments,
    links: [
        () => <a href="mailto:support@spitfacebattles.com">support@spitfacebattles.com</a>,
        () => <a href="https://twitter.com/spitfacebattles" target="_blank" rel="no noreferrer">X (Twitter)</a>
    ]
}];

  

const VerifiedPageContent = () => {
  return (
    <Container className="min-vh-100 mt-3 d-flex justify-content-center align-items-center">
        <Card className="rounded-0 shadow-lg border-0 bg-darkest" style={{ maxWidth: "700px", width: "100%" }}>
              <CardHeader className="text-bg-darkest rounded-top border-0 border-bottom border-primary-orange">
                <CardTitle className="text-center fs-1 fw-bold m-0">
                    User Verified <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                </CardTitle>
                <CardSubtitle className="text-center text-uppercase fs-5">Your username and email have been reserved</CardSubtitle>
              </CardHeader>
        
              <CardBody className="text-bg-darkest">
                <CardText className="text-center fs-2 fw-bold">
                  What's Next?
                </CardText>

                <ListGroup flush>
                {nextSteps.map(({ title, description, icon, links = []}, index) => (
                    <ListGroupItem key={`next-step-${title}-li`} className="d-flex align-items-center p-3 mb-2 bg-darkest border border-primary-orange-subtle">
                        <FontAwesomeIcon icon={icon} size="4x" className="text-secondary me-3" />

                        <div className="mx-auto">
                            <ListGroupItemHeading className="fs-4 fw-bold text-secondary-emphasis">
                                {title}
                            </ListGroupItemHeading>
                            <ListGroupItemText className="m-0 fs-6 text-secondary">
                                {description.split(/(\[link-\d+\])/g).map((part, index) => {
                                    const match = part.match(/\[link-(\d+)\]/);
                                    if (match) {
                                        const linkIndex = parseInt(match[1], 10);
                                        const Link = links[linkIndex];
                                        return <React.Fragment key={index}>{<Link />}</React.Fragment>;
                                    }

                                    return part;
                                })}
                            </ListGroupItemText>
                        </div>
                    </ListGroupItem>
                ))}
                </ListGroup>
            </CardBody>
        </Card>
    </Container>
  );
};

export default VerifiedPageContent;
