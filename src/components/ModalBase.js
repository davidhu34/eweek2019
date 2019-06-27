import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { closeModal } from '../actions';


const ModalBase = ({ modal, closeModal }) => <Modal
    open={modal.show}
    basic
    size='small'>
    <Header icon={modal.icon} content={modal.title} />
    <Modal.Content>
        {modal.content}
    </Modal.Content>
    <Modal.Actions>
        { modal.buttons.map( (button,i) => {
            const { text, icon, color } = button
            return <Button
                key={`button${i.toString()}`}
                inverted
                color={color}
                onClick={() => closeModal(i)}>
                {icon? <Icon name={button.icon} />: null}
                {text}
            </Button>
        })}
    </Modal.Actions>
</Modal>

export default connect(
    ({ modal }) => ({ modal }),
    dispatch => ({
        closeModal: (index) => dispatch(closeModal(index))
    })
)(ModalBase)