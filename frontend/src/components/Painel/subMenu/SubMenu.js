import { Menu, Row, Col } from 'antd';
import { UserOutlined, ShoppingOutlined, PlusOutlined, ReloadOutlined, MinusOutlined } from '@ant-design/icons';
import { useState } from "react";
export function SubMenu({ onMenuItemClick }) {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const [currentMenuItem, setCurrentMenuItem] = useState('info');

    const handleMenuClick = (e) => {
        setCurrentMenuItem(e.key);
        onMenuItemClick(e.key);
    };
    return (
        <Row justify="center" align="middle">
            <Col span={16} style={{ textAlign: 'center' }}>
                <h1 style={{ margin: "20px 0px" }}>Painel</h1>
                <Menu mode="horizontal" style={{ display: 'block' }} selectedKeys={[currentMenuItem]} onClick={handleMenuClick}
                >
                    <Menu.Item key="info" icon={<UserOutlined />}>
                        Informações
                    </Menu.Item>

                    <Menu.Item key="lastpay" icon={<ShoppingOutlined />}>
                        Minhas compras
                    </Menu.Item>


                    {
                        userdata.role === 'admin' && <>
                            <Menu.Item key="seepay" icon={<ShoppingOutlined />}>
                                Ver Vendas
                            </Menu.Item>
                            <Menu.Item key="addproduct" icon={<PlusOutlined />}>
                                Adicionar Produto
                            </Menu.Item>
                            <Menu.Item key="updateproduct" icon={<ReloadOutlined />}>
                                Atualizar Produto
                            </Menu.Item>
                            <Menu.Item key="deleteproduct" icon={<MinusOutlined />}>
                                Deletar Produto
                            </Menu.Item>
                        </>
                    }
                </Menu>
            </Col>
        </Row>
    )
}