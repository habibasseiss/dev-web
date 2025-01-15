import { NavLink, Outlet } from "react-router";

export function Layout() {
    return (
        <div>
            <div className="p-4 border-b space-x-8">
                <NavLink to="/">Lista de tarefas</NavLink>
                <NavLink to="/pagina-2">Página 2</NavLink>
                <NavLink to="/pagina-3">Página 3</NavLink>
                <NavLink to="/pagina-4">Página 4</NavLink>
            </div>

            <div className="p-4">
                <Outlet />
            </div>
            
            <div className="p-4 border-t">
                TADS &copy; 2025
            </div>
        </div>
    );
}
