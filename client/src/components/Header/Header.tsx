import './style.css'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink} from '@chakra-ui/react'

const Header = () => {
    return (
        <header>
            <a id='title' href='/'>InterBank</a>
             <Breadcrumb spacing='8px'>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/admin/dashboard'>Painel</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/users/login'>Login</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
        </header>
    )
}

export default Header