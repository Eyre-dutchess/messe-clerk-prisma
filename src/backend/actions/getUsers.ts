import prisma from "@/backend/libs/prismadb"
import { auth } from "@clerk/nextjs/server"

const getUsers = async () =>{
    const {userId}= await auth()
    if(!userId || typeof userId !== "string"){
        return []
    }
    try {
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt: "desc"
            },
            where:{
                NOT:{
                    clerkId: userId!
                }
            }
        })   
        return users     
    } catch (error: any) {
        return []
    }
}

export default getUsers;

// user object
// id:"user_2zZTn5LBGKqSiLGb3qlYvfLiDAE"
// object:"user"
// username:null
// first_name:"Serafina"
// last_name:"Serafina"
// image_url:"https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yekw4SlNuOFhkZHNPWVVFRmNmcTZGWTlhb3giLCJyaWQiOiJ1c2VyXzJ6WlRuNUxCR0txU2lMR2IzcWxZdmZMaURBRSIsImluaXRpYWxzIjoiU1MifQ"
// has_image:false
// primary_email_address_id:"idn_2zZTn5YO4ZLnwcwlkUB8JODZWl5"
// primary_phone_number_id:null
// primary_web3_wallet_id:null
// password_enabled:true
// two_factor_enabled:false
// totp_enabled:false
// backup_code_enabled:false
// phone_numbers:
// web3_wallets:
// passkeys:
// external_accounts:
// saml_accounts:
// enterprise_accounts:
// password_last_updated_at:1751937758926
// public_metadata:
// private_metadata:
// unsafe_metadata:
// external_id:null
// last_sign_in_at:1751938008888
// banned:false
// locked:false
// lockout_expires_in_seconds:null
// verification_attempts_remaining:100
// created_at:1751937758926
// updated_at:1751938878253
// delete_self_enabled:true
// create_organization_enabled:true
// last_active_at:1751937758925
// mfa_enabled_at:null
// mfa_disabled_at:null
// legal_accepted_at:null
// profile_image_url:"https://www.gravatar.com/avatar?d=mp"