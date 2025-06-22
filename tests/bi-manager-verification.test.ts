import { describe, it, expect, beforeEach } from "vitest"

describe("BI Manager Verification Contract", () => {
  const contractState = {
    verifiedManagers: new Map(),
    managerPermissions: new Map(),
    contractOwner: "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KX17ECXJWHAL",
  }
  
  beforeEach(() => {
    contractState.verifiedManagers.clear()
    contractState.managerPermissions.clear()
  })
  
  describe("verify-manager", () => {
    it("should verify a manager successfully", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const result = verifyManager(contractState, manager, contractState.contractOwner)
      
      expect(result.success).toBe(true)
      expect(contractState.verifiedManagers.get(manager)).toBe(true)
    })
    
    it("should fail if not called by contract owner", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const caller = "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE"
      const result = verifyManager(contractState, manager, caller)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(100) // ERR_UNAUTHORIZED
    })
    
    it("should fail if manager already verified", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      contractState.verifiedManagers.set(manager, true)
      
      const result = verifyManager(contractState, manager, contractState.contractOwner)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(101) // ERR_ALREADY_VERIFIED
    })
  })
  
  describe("revoke-manager", () => {
    it("should revoke manager verification", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      contractState.verifiedManagers.set(manager, true)
      contractState.managerPermissions.set(manager, ["read", "write"])
      
      const result = revokeManager(contractState, manager, contractState.contractOwner)
      
      expect(result.success).toBe(true)
      expect(contractState.verifiedManagers.has(manager)).toBe(false)
      expect(contractState.managerPermissions.has(manager)).toBe(false)
    })
  })
  
  describe("set-permissions", () => {
    it("should set manager permissions", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const permissions = ["read", "write", "admin"]
      contractState.verifiedManagers.set(manager, true)
      
      const result = setPermissions(contractState, manager, permissions, contractState.contractOwner)
      
      expect(result.success).toBe(true)
      expect(contractState.managerPermissions.get(manager)).toEqual(permissions)
    })
    
    it("should fail for unverified manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      const permissions = ["read", "write"]
      
      const result = setPermissions(contractState, manager, permissions, contractState.contractOwner)
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(102) // ERR_NOT_VERIFIED
    })
  })
  
  describe("is-verified-manager", () => {
    it("should return true for verified manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      contractState.verifiedManagers.set(manager, true)
      
      const result = isVerifiedManager(contractState, manager)
      
      expect(result).toBe(true)
    })
    
    it("should return false for unverified manager", () => {
      const manager = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
      
      const result = isVerifiedManager(contractState, manager)
      
      expect(result).toBe(false)
    })
  })
})

// Mock contract functions
function verifyManager(state, manager, caller) {
  if (caller !== state.contractOwner) {
    return { success: false, error: 100 }
  }
  if (state.verifiedManagers.has(manager)) {
    return { success: false, error: 101 }
  }
  state.verifiedManagers.set(manager, true)
  return { success: true }
}

function revokeManager(state, manager, caller) {
  if (caller !== state.contractOwner) {
    return { success: false, error: 100 }
  }
  state.verifiedManagers.delete(manager)
  state.managerPermissions.delete(manager)
  return { success: true }
}

function setPermissions(state, manager, permissions, caller) {
  if (caller !== state.contractOwner) {
    return { success: false, error: 100 }
  }
  if (!state.verifiedManagers.has(manager)) {
    return { success: false, error: 102 }
  }
  state.managerPermissions.set(manager, permissions)
  return { success: true }
}

function isVerifiedManager(state, manager) {
  return state.verifiedManagers.get(manager) || false
}
