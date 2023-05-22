import 'react-pro-sidebar/dist/css/styles.css'
import './SideBar.scss'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'
import { FaTachometerAlt, FaGem, FaList, FaGithub } from 'react-icons/fa'
import { DiReact } from 'react-icons/di'
import sidebarBg from '../../assets/bg2.jpg'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props

  const navigate = useNavigate()

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <DiReact
              size={'3em'}
              color={'00bfff'}
              style={{ cursor: 'pointer', display: 'inline' }}
              onClick={() => navigate('/')}
            ></DiReact>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              Pro Quizzz
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              Dashboard <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu title="Features" icon={<FaGem />}>
              <MenuItem>
                Quản lý Users <Link to="manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lý bài Quiz <Link to="manage-quizzes" />
              </MenuItem>
              <MenuItem>Quản lý câu hỏi</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                viewSource
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  )
}

export default SideBar
