const oracledb = require('oracledb');

async function testConnection() {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: 'SELCTP',
            password: 'SELCTP',
            connectString: '193.16.100.150/VMDB'
        });

        console.log('Successfully connected to OracleDB');
        const mobile = '9829040300';
        const result = await connection.execute(
            `SELECT User_No FROM Urm_User_Master WHERE Mobile = ${ mobile }`,
            
        );
        // console.log(result);
        // console.log('abc',typeof(result?.rows[0]));
        // console.log('abc11',typeof(result));
        const result1 = await connection.execute(
            `SELECT rm.ref_id Id, rm.requisition_id RequisitionId, TO_CHAR (rm.PENALTY_DATE, 'DD-Mon-YYYY') PenaltyDate, rm.post_id PostId, cp.description POST,
                    CASE WHEN RM.PROJECT_ID = 0 THEN NVL (CFP.PROJECT_NAME, 'Shared Projects') ELSE CFP.PROJECT_NAME END ProjectName,
                     col.description OfficeLocation, RM.OTHER_LOC_NAME OtherLocName , re.min_exp OverallExperience, rm.ctc, WP.DESCRIPTION PhaseName, nvl(Ca2.App_Cnt,0) NoOfApplicants, rm.vacancies, cpr.description Priority,        
                      RQV.QUAL_NAME  qualifications,
                     WS.DESCRIPTION RequisitionStatus, OS.DESCRIPTION OverallStatus, TO_CHAR (rm.target_date, 'DD-Mon-YYYY') TargetDate, um.user_name || '(' || um.loginid || ')' RequestorNameAndId,
                     dp.DEPARTMENT_NAME RequestorDepartment, DG.DESIGNATION_NAME RequestorPost,
                     CASE WHEN rm.pending_with IS NOT NULL THEN TO_CHAR (ump.USER_NAME) || ' ' || '(' || TO_CHAR (ump.LOGINID) || ')' ELSE ' - ' END PendingWith
                     FROM requisition_master rm, cfg_post cp, cfg_office_location col, cfg_priority cpr, wf_status ws, wf_status os, cfg_department dp,URM_USER_MASTER ump,
                     CFG_PROJECT cfp, WF_PHASE wp,urm_user_master um,cfg_designation dg,     (Select distinct Project_Ref_Id, Member_User_No from OPM_ACTIVE_PMS@SELCTP_HRMS Where Member_User_No = 5 ) PM ,
                    (SELECT QM.REQ_REF_ID, NVL ( RTRIM ( XMLAGG (XMLELEMENT (r, QC.DESCRIPTION || ', ') ORDER BY QC.ref_id).EXTRACT ( '//text()'), ', '), '-') QUAL_NAME
                    FROM REQUISITION_QUAL_MASTER QM, REQUISITION_QUAL_DETAIL QD, CFG_QUALIFICATION QC WHERE QM.REF_ID = QD.REQ_QUAL_REF_ID AND QD.QUAL_ID = QC.REF_ID(+) GROUP BY QM.REQ_REF_ID) rqv,
                    (SELECT req_ref_id, ROUND (AVG (min_exp), 2) min_exp FROM requisition_experience WHERE experience_type_id = 1 GROUP BY req_ref_id) re,
                    (SELECT PMM.REQ_REF_ID,  COUNT (NVL (CA.REF_ID, 0)) App_Cnt FROM CANDIDATE_APPLICATION CA, PUBLICATION_MPR_MASTER PMM WHERE CA.POST_ID = PMM.post_ID group by REQ_REF_ID ) Ca2
                    WHERE  rm.post_id = cp.ref_id
                     AND rm.location_id = col.ref_id
                     AND rm.priority_id = cpr.ref_id
                     AND rm.status_id = ws.ref_id
                     AND rm.OVERALL_STATUS_ID = os.ref_id
                     AND rm.department_id = dp.DEPARTMENT_ID and rm.requestor_id=um.user_no
                     and um.designation_id=dg.designation_id(+)
                       AND RM.PHASE_ID = WP.REF_ID
                     AND rm.ref_id = RQV.req_ref_id(+)
                     AND rm.ref_id = re.req_ref_id(+)
                      AND rm.ref_id = ca2.req_ref_id(+)
                     AND RM.PENDING_WITH = ump.USER_NO(+)
                     AND RM.PROJECT_ID = CFP.REF_ID(+)       
                     AND RM.PROJECT_ID = PM.PROJECT_REF_ID(+)
                     AND RM.IS_SPLIT = 'N'AND RM.PENDING_WITH = ${result.rows}                   
                     order by 1 desc`,
            
        );
        console.log('Query Results:', result.rows);
        console.log('Query Results1:', result1.rows);

    } catch (err) {
        console.error('Error connecting to OracleDB:', err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing the connection:', err);
            }
        }
    }
}

testConnection();
