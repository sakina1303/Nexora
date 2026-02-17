import { useEffect, useMemo, useState } from 'react'

const apiBase = import.meta.env.VITE_API_URL || ''

const emptyService = {
    title: '',
    description: '',
    price: ''
}

const emptyOrder = {
    customerName: '',
    email: ''
}

const formatPrice = (value) => `$${Number(value).toFixed(2)}`

function App() {
    const [services, setServices] = useState([])
    const [status, setStatus] = useState('Checking API...')
    const [serviceForm, setServiceForm] = useState(emptyService)
    const [orderForm, setOrderForm] = useState(emptyOrder)
    const [cart, setCart] = useState([])
    const [message, setMessage] = useState('')
    const [busy, setBusy] = useState(false)

    const cartTotal = useMemo(
        () => cart.reduce((sum, item) => sum + item.price, 0),
        [cart]
    )

    const loadServices = async () => {
        try {
            const res = await fetch(`${apiBase}/api/services`)
            if (!res.ok) throw new Error('Failed to load services')
            const data = await res.json()
            setServices(data)
        } catch (error) {
            setMessage('Unable to load services right now.')
        }
    }

    useEffect(() => {
        const ping = async () => {
            try {
                const res = await fetch(`${apiBase}/api/health`)
                if (!res.ok) throw new Error('API unavailable')
                setStatus('API online')
            } catch (error) {
                setStatus('API offline')
            }
        }

        ping()
        loadServices()
    }, [])

    const handleServiceChange = (event) => {
        const { name, value } = event.target
        setServiceForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleOrderChange = (event) => {
        const { name, value } = event.target
        setOrderForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleServiceSubmit = async (event) => {
        event.preventDefault()
        setMessage('')
        setBusy(true)

        try {
            const payload = {
                title: serviceForm.title.trim(),
                description: serviceForm.description.trim(),
                price: Number(serviceForm.price)
            }

            const res = await fetch(`${apiBase}/api/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error('Failed to create service')

            setServiceForm(emptyService)
            await loadServices()
            setMessage('Service published successfully.')
        } catch (error) {
            setMessage('Could not create the service. Check the form and try again.')
        } finally {
            setBusy(false)
        }
    }

    const handleAddToCart = (service) => {
        setCart((prev) => [...prev, service])
    }

    const handleRemoveFromCart = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index))
    }

    const handleOrderSubmit = async (event) => {
        event.preventDefault()
        if (!cart.length) {
            setMessage('Add at least one service before placing an order.')
            return
        }

        setBusy(true)
        setMessage('')

        try {
            const responses = await Promise.all(
                cart.map((service) =>
                    fetch(`${apiBase}/api/orders`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            customerName: orderForm.customerName.trim(),
                            email: orderForm.email.trim(),
                            serviceId: service.id
                        })
                    })
                )
            )

            if (responses.some((response) => !response.ok)) {
                throw new Error('Order request failed')
            }

            setCart([])
            setOrderForm(emptyOrder)
            setMessage('Order submitted. We will reach out shortly!')
        } catch (error) {
            setMessage('Order failed. Please try again in a moment.')
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="app">
            <section className="hero">
                <div>
                    <span className="tag">Digital Service Marketplace</span>
                    <h1>Nexora</h1>
                    <p>
                        Curated productized services for founders, teams, and
                        fast-moving startups. Scope instantly, ship faster, and
                        keep every deliverable in one place.
                    </p>
                    <div className="meta">
                        <span>Status: {status}</span>
                        <span>{services.length} services live</span>
                    </div>
                </div>
                <div className="hero-card">
                    <strong>{formatPrice(cartTotal)}</strong>
                    <span>Current cart total</span>
                    <p className="muted">Bundle services and submit one client brief.</p>
                    <button className="button secondary" type="button" onClick={loadServices}>
                        Refresh services
                    </button>
                </div>
            </section>

            {message && <div className="notice">{message}</div>}

            <section className="layout">
                <div className="panel">
                    <h2>Featured Services</h2>
                    <p className="muted">Pick from ready-to-ship service packages.</p>
                    <div className="service-grid">
                        {services.length === 0 ? (
                            <div className="service-card">
                                <strong>No services yet</strong>
                                <span className="muted">Add your first service below.</span>
                            </div>
                        ) : (
                            services.map((service) => (
                                <div key={service.id} className="service-card">
                                    <strong>{service.title}</strong>
                                    <span className="muted">{service.description}</span>
                                    <span className="price">{formatPrice(service.price)}</span>
                                    <button
                                        className="button"
                                        type="button"
                                        onClick={() => handleAddToCart(service)}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="panel">
                    <h2>Cart & Order</h2>
                    <div className="cart-list">
                        {cart.length === 0 ? (
                            <span className="muted">No services selected yet.</span>
                        ) : (
                            cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="cart-item">
                                    <span>{item.title}</span>
                                    <div>
                                        <span className="price">{formatPrice(item.price)}</span>
                                        <button
                                            className="button secondary"
                                            type="button"
                                            onClick={() => handleRemoveFromCart(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="cart-total">Total: {formatPrice(cartTotal)}</div>

                    <form className="form" onSubmit={handleOrderSubmit}>
                        <input
                            name="customerName"
                            placeholder="Customer name"
                            value={orderForm.customerName}
                            onChange={handleOrderChange}
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email address"
                            value={orderForm.email}
                            onChange={handleOrderChange}
                            required
                        />
                        <button className="button" type="submit" disabled={busy}>
                            Place order
                        </button>
                    </form>
                </div>
            </section>

            <section className="panel">
                <h2>Publish a Service</h2>
                <p className="muted">Create productized offerings that clients can buy instantly.</p>
                <form className="form" onSubmit={handleServiceSubmit}>
                    <input
                        name="title"
                        placeholder="Service title"
                        value={serviceForm.title}
                        onChange={handleServiceChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Describe the deliverable, timeline, and any add-ons."
                        value={serviceForm.description}
                        onChange={handleServiceChange}
                        required
                    />
                    <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Price"
                        value={serviceForm.price}
                        onChange={handleServiceChange}
                        required
                    />
                    <button className="button" type="submit" disabled={busy}>
                        Publish service
                    </button>
                </form>
            </section>
        </div>
    )
}

export default App
