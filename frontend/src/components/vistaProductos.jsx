import React, { useState, useMemo, useEffect } from "react";
import CardProducto from "./cardproducto";
import { Container, Row, Col, Dropdown, DropdownButton, Form, Button, Spinner } from "react-bootstrap";
import { useCart } from "../context/useCart";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/api.js";

const VistaProductos = () => {
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("Todos");
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(20000000);
  const { handleAdd } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api("/productos");
        const data = await res.json();
        setProductos(data);
      } catch {
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Categorías únicas dinámicas
  const categoriasUnicas = useMemo(() => [
    "Todos",
    ...Array.from(new Set(productos.map(p => p.category)))
  ], [productos]);

  // Leer parámetros de URL para categoría
  useEffect(() => {
    const categoriaParam = searchParams.get('categoria');
    if (categoriaParam && categoriasUnicas.includes(categoriaParam)) {
      setCategoria(categoriaParam);
    }
  }, [searchParams, categoriasUnicas]);

  const precioInicial = () => {
    setPrecioMin(0);
    setPrecioMax(20000000);
  };

  const productosFiltrados = productos.filter(p =>
    (categoria === "Todos" || p.category === categoria) &&
    p.price >= precioMin &&
    p.price <= precioMax
  );

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="primary" />
        <div>Cargando productos...</div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 tienda-titulo">{categoria}</h2>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={() => {setCategoria("Todos"); precioInicial()}}>Borrar Filtros</Button>
          <DropdownButton
            title={"Categoría: " + categoria}
            variant="secondary"
            onSelect={cat => setCategoria(cat)}
          >
            {categoriasUnicas.map(cat => (
              <Dropdown.Item key={cat} eventKey={cat} active={cat === categoria}>
                {cat}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </div>
      <Form className="mb-4 d-flex gap-3 align-items-center tienda-filtros">
        <Form.Label className="mb-0">Precio entre:</Form.Label>
        <Form.Control
          type="range"
          min={0}
          max={20000000}
          value={precioMin}
          onChange={e => setPrecioMin(Number(e.target.value))}
        />
        <span>${precioMin}</span>
        <Form.Control
          type="range"
          min={0}
          max={20000000}
          value={precioMax}
          onChange={e => setPrecioMax(Number(e.target.value))}
        />
        <span>${precioMax}</span>
      </Form>
      <Row>
        {productosFiltrados.map(producto => (
          <Col key={producto.id} xs={12} md={6} lg={4} className="mb-4">
            <CardProducto {...producto} onAdd={handleAdd} />
          </Col>
        ))}
      </Row>
      {productosFiltrados.length === 0 && (
        <div className="text-center text-muted">No hay productos para mostrar.</div>
      )}
    </Container>
  );
};

export default VistaProductos;