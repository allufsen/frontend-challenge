import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { Inews } from "./Inews";
import { Button, Avatar, Card, Row, Col, Layout, Space, PageHeader, Spin } from "antd";
const { Footer, Content } = Layout;
const { Meta } = Card;

function App() {
  const [datas, setDatas] = useState<Inews[]>([]);
  const [page, setPage] = useState(12);
  const myFetch = async (page: number) => {
    const res = await fetch(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=0a75b37eb93b48718aa8e0f76a66f138&pageSize=${page}`);
    // const res = await fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=0a75b37eb93b48718aa8e0f76a66f138&pageSize=${page}`);
    const data = await res.json();
    setDatas(data.articles);
  };

  const loadPage = () => {
    setPage((page) => {
      return page + 12;
    });
  };

  useEffect(() => {
    myFetch(page);
  }, [page]);

  return (
    <div>
      <Layout>
        <PageHeader className="site-page-header" style={{ backgroundColor: "black" }} title="News API" />
        <Content
          style={{
            margin: "20px 0",
          }}
        >
          <Row>
            {datas.length === 0 && (
              <div className="spinner">
                <Spin size="large" />
              </div>
            )}
            <Space size={10} wrap>
              {datas.map((data, i) => (
                <Col xs={{ span: 5, offset: 3 }} md={{ span: 8, offset: 7 }} lg={{ span: 3, offset: 5 }}>
                  <Card
                    onClick={() => {
                      window.open(data.url);
                    }}
                    style={{
                      borderRadius: 5,
                      width: 300,
                      height: 300,
                    }}
                    cover={
                      <img
                        className="image-card"
                        alt="example"
                        style={{
                          borderRadius: "5px 5px 0 0",
                          width: "100%",
                          height: 150,
                          objectFit: "cover",
                        }}
                        src={data.urlToImage}
                      />
                    }
                  >
                    <Meta
                      style={{
                        width: "100%",
                        height: 100,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      avatar={<Avatar src={data.urlToImage} />}
                      title={data.title}
                      description={data.content}
                    />
                  </Card>
                </Col>
              ))}
            </Space>
          </Row>
        </Content>
        <Button
          onClick={loadPage}
          style={{
            padding: "0 40px",
            margin: "0 auto",
            width: "min-content",
            fontWeight: 700,
            borderRadius: 3,
            backgroundColor: "gray",
            border: "none",
          }}
          type="primary"
        >
          Load More..
        </Button>
        <Footer style={{ backgroundColor: "black", marginTop: 20 }}>News API 2022</Footer>
      </Layout>
    </div>
  );
}

export default App;
