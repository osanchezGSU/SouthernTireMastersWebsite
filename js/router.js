const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href)
    handleLocation();
}

const routes = {
    404: {
        template: "./404.html",
        title: "",
        description: ""
    },
    "/": {
        template:"./views/home.html",
        title: "",
        description: ""
    },
    "/tires": {
        template:"./views/tires.html",
        title: "",
        description: ""
    },
    "/services": {
        template:"./views/services.html",
        title: "",
        description: ""
    },
    "/locations": {
        template:"./views/locations.html",
        title: "",
        description: ""
    },
    "/tips-guides": {
        template:"./views/tips-guides.html",
        title: "",
        description: ""
    },
    "/financing": {
        template:"/views/financing.html",
        title: "",
        description: ""
    },
    "/wheels": {
        template:"./views/services/wheels.html",
        title: "",
        description: ""
    },
    "/tire-installation": {
        template:"./views/services/tire-installation.html",
        title: "",
        description: ""
    },
    "/tire-balance": {
        template:"./views/services/tire-balance.html",
        title: "",
        description: ""
    },
    "/tire-repairs": {
        template:"./views/services/tire-repairs.html",
        title: "",
        description: ""
    },
    "/tire-rotation": {
        template:"./views/services/tire-rotation.html",
        title: "",
        description: ""
    },
    "/tpms": {
        template:"./views/services/tpms.html",
        title: "",
        description: ""
    },
    "/wheel-alignments": {
        template:"./views/services/wheel-alignemnts.html",
        title: "",
        description: ""
    },
    "/suspension-check": {
        template:"./views/services/suspension-check.html",
        title: "",
        description: ""
    },
    "/brake-check": {
        template:"./views/services/brake-check.html",
        title: "",
        description: ""
    },
     "/lift-lower-kits": {
        template:"./views/services/lift-lower-kits.html",
        title: "",
        description: ""
    }, 
    "/oil-change": {
        template:"./views/services/oil-change.html",
        title: "",
        description: ""
    }
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404]
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("app").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
