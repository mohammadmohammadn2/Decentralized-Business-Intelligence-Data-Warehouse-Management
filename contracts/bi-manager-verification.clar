;; BI Manager Verification Contract
;; Manages verification and authorization of business intelligence managers

(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_ALREADY_VERIFIED (err u101))
(define-constant ERR_NOT_VERIFIED (err u102))

;; Data maps
(define-map verified-managers principal bool)
(define-map manager-permissions principal (list 10 (string-ascii 50)))

;; Verify a BI manager
(define-public (verify-manager (manager principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (asserts! (is-none (map-get? verified-managers manager)) ERR_ALREADY_VERIFIED)
    (map-set verified-managers manager true)
    (ok true)
  )
)

;; Revoke manager verification
(define-public (revoke-manager (manager principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (map-delete verified-managers manager)
    (map-delete manager-permissions manager)
    (ok true)
  )
)

;; Set manager permissions
(define-public (set-permissions (manager principal) (permissions (list 10 (string-ascii 50))))
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (asserts! (is-some (map-get? verified-managers manager)) ERR_NOT_VERIFIED)
    (map-set manager-permissions manager permissions)
    (ok true)
  )
)

;; Check if manager is verified
(define-read-only (is-verified-manager (manager principal))
  (default-to false (map-get? verified-managers manager))
)

;; Get manager permissions
(define-read-only (get-manager-permissions (manager principal))
  (map-get? manager-permissions manager)
)
