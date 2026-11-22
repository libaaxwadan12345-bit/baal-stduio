BS ENTERTAINMENT — GUEST COMMENTS & REACTIONS
============================================

CUSUB
- Dadku account ma samaysanayaan.
- Waxay dooranayaan magac/naanays iyo faallo (ugu badnaan 500 xaraf).
- Faallo kasta marka hore waxay gashaa pending; public-ku ma arko ilaa aad oggolaato.
- Reactions: ❤️ 🔥 😍 😂 😢. Hal reaction ayaa visitor kasta u yaal episode kasta; wuu beddeli karaa.
- Admin Dashboard-ka waxaa lagu daray Community tab oo muujinaya tirada faallooyinka la oggolaaday iyo reactions-ka.

MUHIIM: SUPABASE WAA LOO BAAHAN YAHAY
GitHub Pages ma kaydiyo database. Si faallooyinka iyo reactions-ku ugu wada muuqdaan dadka oo dhan, waa inaad ku xirtaa Supabase. ZIP-kan ma aha mid shaqaynaya ilaa aad sameyso tallaabooyinkan.

TALLAABADA 1 — SAMEE SUPABASE PROJECT
1. Fur https://supabase.com/ oo samee project cusub.
2. Marka project-ku diyaar noqdo, gal Project Settings → API.
3. Nuqul ka samee Project URL iyo anon/public key.
4. Fur faylka supabase-config.js.
5. Ku beddel PASTE_SUPABASE_PROJECT_URL_HERE URL-kaaga.
6. Ku beddel PASTE_SUPABASE_ANON_PUBLIC_KEY_HERE anon/public key-gaaga.
7. WALIGAA ha gelin service_role ama secret key website-ka.

TALLAABADA 2 — SAMEE DATABASE TABLES
1. Supabase ka fur SQL Editor.
2. New query dooro.
3. Fur faylka supabase-guest-comments.sql, dhammaan code-ka copy garee.
4. Ku paste garee SQL Editor, kadib Run guji.

TALLAABADA 3 — GITHUB
1. ZIP-kan Extract ku samee telefoonkaaga.
2. GitHub repository-ga BS-Entertainment fur.
3. Ku upload garee oo ku beddel index.html, app.js iyo style.css.
4. Sidoo kale ku dar community.js, supabase-config.js iyo supabase-guest-comments.sql.
5. Commit changes samee.
6. Sug GitHub Pages inuu dib u daabaco website-ka.

SIDA FAALLO LOO MAAMULO
1. Gal Supabase project-kaaga.
2. Fur Table Editor → episode_comments.
3. Faallooyinka cusub status-koodu waa pending.
4. Hubi faallada. Haddii ay habboon tahay, status ka dhig approved.
5. Haddii aysan habboonayn, status ka dhig rejected.
6. Faallo approved ah ayaa website-ka ka muuqanaysa.

AMNIGA IYO XADIDAADAHA
- Guest comments ma weydiinayaan email ama telefoon. Dadka ku dhiirrigeli inaysan qorin xog gaar ah.
- Faallooyinka waxaa loo dejiyey moderation ka hor inta aan la soo bandhigin.
- Admin-ka hadda jira ee website-ka waa demo password browser-side ah; ma aha amni dhab ah. Maamulka faallooyinka ku samee Supabase Table Editor oo keliya, hana siin qof kale gelitaanka Supabase project-ka.
- Browser-generated visitor ID wuxuu xaddidayaa hal reaction halkii episode/browser, balse qof aqoon farsamo leh wuu beddeli karaa. Ma aha aqoonsi qofeed la xaqiijiyey.
- Xogta Anime/Episodes iyo video-yada version-kii hore wali waxay ku jiraan localStorage/IndexedDB browser-ka. Sidaas darteed dadka kale si toos ah uma arki doonaan episodes-ka aad telefoonkaaga ku dartay. Si dhammaan booqdayaashu u arkaan videos-ka, waxaa xiga in Anime/Episodes iyo video files loo raro Supabase Database + Storage. Comments-ku waxay ku xirmaan magaca anime + episode + number; waa inay isku mid noqdaan browser kasta.

FAYLASHA
- index.html
- style.css
- app.js
- community.js
- supabase-config.js
- supabase-guest-comments.sql
- README-SO.txt


CODSI XUBINNIMO / VOICE ACTING
- Visitors can apply without creating an account from the website section #auditions.
- To receive applications from every visitor, configure Supabase URL + anon key in supabase-config.js.
- Run the FULL supabase-guest-comments.sql file in Supabase SQL Editor. It also creates audition_applications.
- Review private applications in Supabase > Table Editor > audition_applications. No public read access is enabled.
- The website's Admin tab is a demo/local panel; do not treat its local audition list as a secure shared inbox.
