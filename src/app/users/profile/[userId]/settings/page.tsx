//(редирект на General Information)

import { redirect } from 'next/navigation'

const SettingsRoot = async ({params}:{params:Promise<{ userId: string }>}) => {
   const { userId } = await params
  redirect(`/users/profile/${userId}/settings/general-information`)
}

export default SettingsRoot

// 'use client'
// import TabNavigation, {tabs} from "./TabNavigation"
// import { useState } from "react"
// import GeneralInformation from "./GeneralInformation/page"
// import Devices from "./Devices/page"
// import AccountManagement from "./AccountManagement/page"
// import MyPayments from "./MyPayments/page"

// const ProfileSettings = () => {
//     const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("General information")
//   return (
//     <div>
//       <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
//        <div className="mt-6">
//         {activeTab === "General information" && <GeneralInformation />}
//         {activeTab === "Devices" && <Devices />}
//         {activeTab === "Account Management" && <AccountManagement />}
//         {activeTab === "My payments" && <MyPayments />}
//       </div>
//     </div>
//   )
// }


// export default ProfileSettings