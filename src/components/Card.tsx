import React from "react"
import styled from "styled-components"

interface Props {
  title: string,
  content: React.ReactNode
}

export default function Card({ title, content }: Props) {

  return (  
    <Container>
      <Content>
        <h4>{title}</h4>
        <h3>{content}</h3>
      </Content>

    </Container>
  )
}

const Container = styled.div`
  padding: 0;
  background-color: #FFFFFF;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`
const Content = styled.div`

  h4{
    color: var(--text-color);
  }
`