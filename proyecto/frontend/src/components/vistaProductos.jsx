import React, { useState, useMemo, useEffect } from "react";
import CardProducto from "./cardproducto";
import { Container, Row, Col, Dropdown, DropdownButton, Form, Button, Spinner } from "react-bootstrap";
import { useCart } from "../context/useCart";
import { getProductos } from "../services/productosService";
import { useSearchParams } from "react-router-dom";

const LoadingSpinner = () => (
  <Container className="my-5 text-center">
    <Spinner animation="border" variant="primary" />
    <div>Cargando productos...</div>
  </Container>
);

const HeaderSection = ({ categoria, onClearFilters, onCategoriaChange, categoriasUnicas }) => (
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="mb-0 tienda-titulo">{categoria}</h2>
    <div className="d-flex gap-2">
      <Button variant="outline-primary" onClick={onClearFilters}>
        Borrar Filtros
      </Button>
      <DropdownButton
        title={"Categoría: " + categoria}
        variant="secondary"
        onSelect={onCategoriaChange}
      >
        {categoriasUnicas.map(cat => (
          <Dropdown.Item key={cat} eventKey={cat} active={cat === categoria}>
            {cat}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  </div>
);

const PriceFilter = ({ precioMin, precioMax, onPrecioMinChange, onPrecioMaxChange }) => (
  <Form className="mb-4 d-flex gap-3 align-items-center tienda-filtros">
    <Form.Label className="mb-0">Precio entre:</Form.Label>
    <Form.Control
      type="range"
      min={0}
      max={20000000}
      value={precioMin}
      onChange={e => onPrecioMinChange(Number(e.target.value))}
    />
    <span>${precioMin}</span>
    <Form.Control
      type="range"
      min={0}
      max={20000000}
      value={precioMax}
      onChange={e => onPrecioMaxChange(Number(e.target.value))}
    />
    <span>${precioMax}</span>
  </Form>
);

const ProductGrid = ({ productos, onAdd }) => (
  <Row>
    {productos.map(producto => (
      <Col key={producto.id} xs={12} md={6} lg={4} className="mb-4">
        <CardProducto {...producto} onAdd={onAdd} />
      </Col>
    ))}
  </Row>
);

const EmptyState = () => (
  <div className="text-center text-muted">No hay productos para mostrar.</div>
);

const VistaProductos = () => {
  const [searchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("Todos");
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(20000000);
  const { handleAdd } = useCart();

  const fetchProductos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const categoriasUnicas = useMemo(() => [
    "Todos",
    ...Array.from(new Set(
      productos
        .filter(p => p && p.category && typeof p.category === 'string')
        .map(p => p.category)
    ))
  ], [productos]);

  useEffect(() => {
    const categoriaParam = searchParams.get('categoria');
    if (categoriaParam && categoriasUnicas.includes(categoriaParam)) {
      setCategoria(categoriaParam);
    }
  }, [searchParams, categoriasUnicas]);

  const handleClearFilters = () => {
    setCategoria("Todos");
    setPrecioMin(0);
    setPrecioMax(20000000);
  };

  const handleCategoriaChange = (cat) => setCategoria(cat);

  const handlePrecioMinChange = (value) => setPrecioMin(value);

  const handlePrecioMaxChange = (value) => setPrecioMax(value);

  const productosFiltrados = productos.filter(p =>
    (categoria === "Todos" || p.category === categoria) &&
    p.price >= precioMin &&
    p.price <= precioMax
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-4">
      <HeaderSection
        categoria={categoria}
        onClearFilters={handleClearFilters}
        onCategoriaChange={handleCategoriaChange}
        categoriasUnicas={categoriasUnicas}
      />
      
      <PriceFilter
        precioMin={precioMin}
        precioMax={precioMax}
        onPrecioMinChange={handlePrecioMinChange}
        onPrecioMaxChange={handlePrecioMaxChange}
      />
      
      <ProductGrid productos={productosFiltrados} onAdd={handleAdd} />
      
      {productosFiltrados.length === 0 && <EmptyState />}
    </Container>
  );
};

export default VistaProductos;