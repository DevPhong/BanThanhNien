'use client'
import React, { useState } from 'react'

import {
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper
} from '@mui/material'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

interface Member {
  id: number
  name: string
  score: number
}

const getToday = () => {
  const today = new Date()

  return today.toLocaleDateString('vi-VN')
}

export default function ScoreTable() {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Nguyễn Văn A', score: 10 },
    { id: 2, name: 'Trần Thị B', score: 8 },
    { id: 3, name: 'Nguyễn Văn C', score: 5 },
    { id: 4, name: 'Phạm Văn D', score: 7 }
  ])

  const availableMembers = ['Lê Thị E', 'Trương Văn F']
  const [selectedName, setSelectedName] = useState('')
  const [openConfirm, setOpenConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleAddMember = () => {
    if (selectedName && !members.some(m => m.name === selectedName)) {
      setMembers([...members, { id: Date.now(), name: selectedName, score: 0 }])
      setSelectedName('')
    }
  }

  const handleIncreaseScore = (id: number) => {
    setMembers(members.map(m => (m.id === id ? { ...m, score: m.score + 1 } : m)))
  }

  const handleDecreaseScore = (id: number) => {
    setMembers(members.map(m => (m.id === id ? { ...m, score: m.score - 1 } : m)))
  }

  const handleRemoveMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id))
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h5' gutterBottom>
        Bảng chấm điểm
      </Typography>
      <Typography variant='subtitle1' gutterBottom>
        Ngày hiện tại: {getToday()}
      </Typography>

      {/* Table HTML thuần */}

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table className={tableStyles.table}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: 8, textAlign: 'left', border: '1px solid #ddd' }}>Tên</th>
              <th style={{ padding: 8, textAlign: 'center', border: '1px solid #ddd' }}>Điểm</th>
              <th style={{ padding: 8, textAlign: 'center', border: '1px solid #ddd' }}>Tăng / Giảm điểm</th>
              <th style={{ padding: 8, textAlign: 'center', border: '1px solid #ddd' }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td style={{ padding: 8, border: '1px solid #ddd' }}>{member.name}</td>
                <td style={{ padding: 8, textAlign: 'center', border: '1px solid #ddd' }}>{member.score}</td>
                <td style={{ padding: 8, textAlign: 'center', border: '1px solid #ddd' }}>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => handleIncreaseScore(member.id)}
                    sx={{ mr: 1 }}
                  >
                    +1
                  </Button>
                  <Button variant='outlined' color='error' size='small' onClick={() => handleDecreaseScore(member.id)}>
                    -1
                  </Button>
                </td>
                <td style={{ padding: 8, textAlign: 'center', border: '1px solid #ddd' }}>
                  <Button variant='outlined' color='error' size='small' onClick={() => handleRemoveMember(member.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Thêm người */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <FormControl size='small' sx={{ minWidth: 180 }}>
          <InputLabel id='select-member-label'>Chọn người</InputLabel>
          <Select
            labelId='select-member-label'
            value={selectedName}
            label='Chọn người'
            onChange={e => setSelectedName(e.target.value)}
          >
            <MenuItem value=''>-- Chọn --</MenuItem>
            {availableMembers
              .filter(name => !members.some(m => m.name === name))
              .map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant='outlined' onClick={handleAddMember} disabled={!selectedName}>
          Thêm người
        </Button>
      </div>

      {/* Nút lưu */}
      <Button variant='contained' color='success' onClick={() => setOpenConfirm(true)}>
        Lưu
      </Button>

      {/* Dialog xác nhận */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Xác nhận lưu</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn lưu bảng điểm này không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Hủy</Button>
          <Button
            onClick={() => {
              setOpenConfirm(false)
              setSaved(true)
            }}
            color='primary'
            variant='contained'
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {saved && (
        <Typography color='success.main' sx={{ mt: 2 }}>
          Đã lưu thành công!
        </Typography>
      )}
    </Paper>
  )
}
