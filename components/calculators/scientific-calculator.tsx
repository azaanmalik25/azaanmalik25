"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [memory, setMemory] = useState<number | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(true)
  const [pendingOperator, setPendingOperator] = useState<string | null>(null)
  const [pendingOperand, setPendingOperand] = useState<number | null>(null)
  const [clearAll, setClearAll] = useState(true)

  const calculate = (rightOperand: number, pendingOperator: string): number => {
    let newResult = 0

    if (pendingOperand !== null) {
      switch (pendingOperator) {
        case "+":
          newResult = pendingOperand + rightOperand
          break
        case "-":
          newResult = pendingOperand - rightOperand
          break
        case "×":
          newResult = pendingOperand * rightOperand
          break
        case "÷":
          if (rightOperand === 0) {
            return Number.NaN // Division by zero
          }
          newResult = pendingOperand / rightOperand
          break
        case "^":
          newResult = Math.pow(pendingOperand, rightOperand)
          break
      }
    }

    return newResult
  }

  const digitPressed = (digit: string) => {
    let newDisplay = display

    if ((display === "0" && digit !== ".") || waitingForOperand) {
      newDisplay = digit
      setWaitingForOperand(false)
    } else {
      newDisplay = display + digit
    }

    setDisplay(newDisplay)
    setClearAll(false)
  }

  const operatorPressed = (operator: string) => {
    const operand = Number.parseFloat(display)

    if (pendingOperator !== null && !waitingForOperand) {
      const result = calculate(operand, pendingOperator)
      setDisplay(String(result))
      setPendingOperand(result)
    } else {
      setPendingOperand(operand)
    }

    setPendingOperator(operator)
    setWaitingForOperand(true)
  }

  const equalsPressed = () => {
    const operand = Number.parseFloat(display)

    if (pendingOperator !== null && !waitingForOperand) {
      const result = calculate(operand, pendingOperator)
      setDisplay(String(result))
      setPendingOperand(null)
      setPendingOperator(null)
    }

    setWaitingForOperand(true)
  }

  const clearPressed = () => {
    if (clearAll) {
      setDisplay("0")
      setPendingOperand(null)
      setPendingOperator(null)
      setWaitingForOperand(true)
    } else {
      setDisplay("0")
      setClearAll(true)
      setWaitingForOperand(true)
    }
  }

  const unaryOperatorPressed = (operator: string) => {
    const operand = Number.parseFloat(display)
    let result = 0

    switch (operator) {
      case "±":
        result = -operand
        break
      case "sin":
        result = Math.sin(operand * (Math.PI / 180)) // Convert to radians
        break
      case "cos":
        result = Math.cos(operand * (Math.PI / 180))
        break
      case "tan":
        result = Math.tan(operand * (Math.PI / 180))
        break
      case "log":
        result = Math.log10(operand)
        break
      case "ln":
        result = Math.log(operand)
        break
      case "√":
        result = Math.sqrt(operand)
        break
      case "x²":
        result = Math.pow(operand, 2)
        break
      case "1/x":
        if (operand === 0) {
          return // Division by zero
        }
        result = 1 / operand
        break
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const memoryOperatorPressed = (operator: string) => {
    switch (operator) {
      case "MC":
        setMemory(null)
        break
      case "MR":
        if (memory !== null) {
          setDisplay(String(memory))
          setWaitingForOperand(true)
        }
        break
      case "M+":
        setMemory((memory || 0) + Number.parseFloat(display))
        setWaitingForOperand(true)
        break
      case "M-":
        setMemory((memory || 0) - Number.parseFloat(display))
        setWaitingForOperand(true)
        break
    }
  }

  const percentPressed = () => {
    const operand = Number.parseFloat(display)

    if (pendingOperator !== null && pendingOperand !== null) {
      let result = 0

      switch (pendingOperator) {
        case "+":
        case "-":
          result = pendingOperand * (operand / 100)
          break
        case "×":
        case "÷":
          result = operand / 100
          break
      }

      setDisplay(String(result))
      setWaitingForOperand(true)
    } else {
      setDisplay(String(operand / 100))
      setWaitingForOperand(true)
    }
  }

  const backspacePressed = () => {
    if (!waitingForOperand) {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1))
      } else {
        setDisplay("0")
        setWaitingForOperand(true)
      }
    }
  }

  const piPressed = () => {
    setDisplay(String(Math.PI))
    setWaitingForOperand(true)
  }

  const ePressed = () => {
    setDisplay(String(Math.E))
    setWaitingForOperand(true)
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 text-right text-2xl font-mono h-16 flex items-center justify-end overflow-hidden">
        {display}
      </Card>

      <div className="grid grid-cols-5 gap-2">
        {/* Memory functions */}
        <Button variant="outline" size="sm" onClick={() => memoryOperatorPressed("MC")}>
          MC
        </Button>
        <Button variant="outline" size="sm" onClick={() => memoryOperatorPressed("MR")}>
          MR
        </Button>
        <Button variant="outline" size="sm" onClick={() => memoryOperatorPressed("M+")}>
          M+
        </Button>
        <Button variant="outline" size="sm" onClick={() => memoryOperatorPressed("M-")}>
          M-
        </Button>
        <Button variant="outline" size="sm" onClick={clearPressed}>
          C
        </Button>

        {/* Scientific functions */}
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("sin")}>
          sin
        </Button>
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("cos")}>
          cos
        </Button>
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("tan")}>
          tan
        </Button>
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("log")}>
          log
        </Button>
        <Button variant="outline" size="sm" onClick={backspacePressed}>
          ⌫
        </Button>

        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("ln")}>
          ln
        </Button>
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("√")}>
          √
        </Button>
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("x²")}>
          x²
        </Button>
        <Button variant="outline" size="sm" onClick={() => operatorPressed("^")}>
          x^y
        </Button>
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("1/x")}>
          1/x
        </Button>

        {/* Constants */}
        <Button variant="outline" size="sm" onClick={piPressed}>
          π
        </Button>
        <Button variant="outline" size="sm" onClick={ePressed}>
          e
        </Button>
        <Button variant="outline" size="sm" onClick={() => unaryOperatorPressed("±")}>
          ±
        </Button>
        <Button variant="outline" size="sm" onClick={percentPressed}>
          %
        </Button>
        <Button variant="outline" size="sm" onClick={() => operatorPressed("÷")}>
          ÷
        </Button>

        {/* Numbers and basic operations */}
        <Button variant="secondary" size="sm" onClick={() => digitPressed("7")}>
          7
        </Button>
        <Button variant="secondary" size="sm" onClick={() => digitPressed("8")}>
          8
        </Button>
        <Button variant="secondary" size="sm" onClick={() => digitPressed("9")}>
          9
        </Button>
        <Button variant="outline" size="sm" onClick={() => operatorPressed("×")}>
          ×
        </Button>
        <Button variant="outline" size="sm" onClick={() => operatorPressed("-")}>
          -
        </Button>

        <Button variant="secondary" size="sm" onClick={() => digitPressed("4")}>
          4
        </Button>
        <Button variant="secondary" size="sm" onClick={() => digitPressed("5")}>
          5
        </Button>
        <Button variant="secondary" size="sm" onClick={() => digitPressed("6")}>
          6
        </Button>
        <Button variant="outline" size="sm" onClick={() => operatorPressed("+")}>
          +
        </Button>
        <Button variant="primary" size="sm" className="row-span-2" onClick={equalsPressed}>
          =
        </Button>

        <Button variant="secondary" size="sm" onClick={() => digitPressed("1")}>
          1
        </Button>
        <Button variant="secondary" size="sm" onClick={() => digitPressed("2")}>
          2
        </Button>
        <Button variant="secondary" size="sm" onClick={() => digitPressed("3")}>
          3
        </Button>
        <Button variant="secondary" size="sm" className="col-span-2" onClick={() => digitPressed("0")}>
          0
        </Button>
        <Button variant="secondary" size="sm" onClick={() => digitPressed(".")}>
          .
        </Button>
      </div>
    </div>
  )
}
